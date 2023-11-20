// import { Injectable } from '@nestjs/common'
// import { EntityManager } from 'typeorm'
// import sharp from 'sharp'

// import { Asset } from '@store/api-core/database'
// import { TransactionService } from '@store/api-core/service'
// import { CreateAssetDto } from '@store/dto'
// import { extname, join, sep } from 'path'
// import { FileUtils } from '@store/utils'

// @Injectable()
// export class AssetService extends TransactionService {
//     constructor(private entityManager: EntityManager) {
//         super()
//     }

//     get assetRepository() {
//         const manager = this.transactionManager_ ?? this.entityManager
//         return manager.getRepository(Asset)
//     }

//     async uploadToStatic(file: Express.Multer.File) {
//         await this.resizeImage(
//             file,
//             'dimensions',
//             3,
//             'the-witcher-2/kiki/kiki2',
//         )
//     }

//     async copyToAnotherPath(fileName: string, newPath: string) {}

//     async createAsset(createAssetDto: CreateAssetDto): Promise<Asset> {
//         return
//     }

//     async resizeImage(
//         file: Express.Multer.File,
//         resizeType: 'dimensions' | 'quality' = 'dimensions',
//         copyNumber: number = 1,
//         directory: string,
//         firstDimensions: number = 720,
//         secondDimensions: number = 480,
//         quality: number = 75,
//     ): Promise<void> {
//         const resizes = this.getResizes(
//             copyNumber,
//             resizeType,
//             quality,
//             firstDimensions,
//             secondDimensions,
//         )
//         const baseDirectory = await this.getBaseDirectory(directory)
//         await this.createCopies(file, resizes, resizeType, baseDirectory)
//     }

//     getResizes(
//         copyNumber: number,
//         resizeType: string,
//         quality: number,
//         firstDimensions: number,
//         secondDimensions: number,
//     ) {
//         const resizes = []
//         for (let i = 0; i < copyNumber; i++) {
//             let newResize = 0
//             if (resizeType === 'quality') newResize = quality - i * 25
//             else if (i === 0) newResize = firstDimensions
//             else if (i === 1) newResize = secondDimensions
//             else newResize = resizes[i - 2] - resizes[i - 1]
//             resizes.push(newResize)
//         }
//         return resizes
//     }

//     async getBaseDirectory(directory: string) {
//         const baseDirectory = join(process.cwd(), 'static', directory)
//         const splitDirectory = join(directory).split(sep)
//         if (splitDirectory.length > 1) {
//             let toBaseDirectory = join(process.cwd(), 'static')
//             for (const dir of splitDirectory) {
//                 toBaseDirectory = join(toBaseDirectory, dir)
//                 await FileUtils.CreateFolder(toBaseDirectory)
//             }
//         } else await FileUtils.CreateFolder(baseDirectory)
//         return baseDirectory
//     }

//     async createCopies(
//         file: Express.Multer.File,
//         resizes: number[],
//         resizeType: string,
//         baseDirectory: string,
//     ) {
//         const { buffer, originalname } = file
//         const extension = extname(originalname)
//         for (const resize of resizes) {
//             const sharpedImage = sharp(buffer)
//             if (resizeType === 'quality') {
//                 const option = { quality: resize }
//                 switch (extension) {
//                     case 'jpg' || 'jpeg':
//                         sharpedImage.jpeg(option)
//                         break
//                     case 'png':
//                         sharpedImage.png(option)
//                         break
//                     default:
//                         sharpedImage.png(option)
//                 }
//             } else sharpedImage.resize(resize)
//             await FileUtils.CreateFolder(join(baseDirectory, `${resize}`))
//             const outputFilePath = join(
//                 baseDirectory,
//                 `${resize}`,
//                 `${originalname}`,
//             )
//             await sharpedImage.toFile(outputFilePath)
//         }
//     }
// }
