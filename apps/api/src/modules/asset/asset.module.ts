import { BadRequestException, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { FILE_EXTENTION, FILE_SIZE } from '@store/constant'

import { AssetController } from './asset.controller'
import { AssetService } from './asset.service'

@Module({
    imports: [
        MulterModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dest: configService.get('paths.temp'),
                fileFilter(req, file, callback) {
                    const extention = extname(file.originalname)
                        .toLowerCase()
                        .slice(1)
                    if (!FILE_EXTENTION.includes(extention))
                        callback(
                            new BadRequestException('Unsupported File'),
                            false,
                        )
                    callback(null, true)
                },
                limits: { fileSize: FILE_SIZE },
                storage: diskStorage({
                    destination: configService.get('paths.temp'),
                    filename: function (req, file, callback) {
                        const extention = extname(
                            file.originalname,
                        ).toLowerCase()
                        const uniqueSuffix =
                            Date.now() + '-' + Math.round(Math.random() * 1e9)
                        callback(null, uniqueSuffix + extention)
                    },
                }),
            }),
        }),
    ],
    providers: [AssetService],
    controllers: [AssetController],
    exports: [AssetService],
})
export class AssetModule {}
