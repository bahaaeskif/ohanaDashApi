import { Injectable } from '@nestjs/common'
import { lookup } from 'mime-types'
import { basename, join, sep } from 'path'
import sharp from 'sharp'
import { EntityManager } from 'typeorm'

import { Asset } from '@store/api-core/database'
import { TransactionBaseService } from '@store/api-core/service'
import { DEFAULT_SIZE_URL, FILE_WIDTH } from '@store/constant'
import { CreateAssetDto, UpdateAssetDto } from '@store/dto'
import { ISizeUrl } from '@store/types'
import { FileUtils } from '@store/utils/api'

@Injectable()
export class AssetService extends TransactionBaseService {
    constructor(private entityManager: EntityManager) {
        super(entityManager)
    }

    get assetRepository() {
        return this.activeManager_.getRepository(Asset)
    }

    async createAsset(
        createAssetDto: CreateAssetDto,
        newDirectory: string,
    ): Promise<Asset> {
        const { url, ...assetDto } = createAssetDto
        const fileData = await this.resizeImage(url, newDirectory)
        const newAsset = await this.assetRepository.save({
            ...assetDto,
            ...fileData,
        })
        return newAsset
    }

    async updateAsset(
        assetId: string,
        updateAssetDto: UpdateAssetDto,
        newDirectory: string,
    ): Promise<Asset> {
        const asset = await this.assetRepository.findOneBy({ id: assetId })
        const { url, ...assetDto } = updateAssetDto
        if (url || url?.length) {
            const fileData = await this.resizeImage(url, newDirectory)
            Object.assign(asset, fileData)
        }
        Object.assign(asset, assetDto)
        const newAsset = await this.assetRepository.save(asset)
        return newAsset
    }

    async resizeImage(url: string, directory: string) {
        let sizesUrls: ISizeUrl = DEFAULT_SIZE_URL
        const fileName = basename(url)
        const baseDirectory = await this.getBaseDirectory(directory)
        const mimeType = lookup(fileName) || 'image/png'
        for (const resize of FILE_WIDTH) {
            const sharpedImage = sharp(url)
            sharpedImage.resize(resize)
            await FileUtils.CreateFolder(join(baseDirectory, `${resize}`))
            const outputFilePath = join(
                baseDirectory,
                `${resize}`,
                `${fileName}`,
            )
            sizesUrls[resize] = outputFilePath
            await sharpedImage.toFile(outputFilePath)
        }
        return { sizesUrls, mimeType }
    }

    async moveImage(url: string, directory: string) {
        const fileName = basename(url)
        const baseDirectory = await this.getBaseDirectory(directory)
        const sharpedImage = sharp(url)
        const outputFilePath = join(baseDirectory, `${fileName}`)
        await sharpedImage.toFile(outputFilePath)
        return outputFilePath
    }

    async getBaseDirectory(directory: string) {
        const baseDirectory = join(directory)
        const splitDirectory = baseDirectory.split(sep)
        if (splitDirectory.length > 1) {
            let toBaseDirectory = ''
            for (const dir of splitDirectory) {
                toBaseDirectory = join(toBaseDirectory, dir)
                await FileUtils.CreateFolder(toBaseDirectory)
            }
        } else await FileUtils.CreateFolder(baseDirectory)
        return baseDirectory
    }
}
