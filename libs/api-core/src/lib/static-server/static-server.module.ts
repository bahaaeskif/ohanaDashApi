import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { FileUtils } from '@store/utils/api'

@Module({
    imports: [
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const uploadsPath = configService.get('paths.uploads')
                const uploadsFullPath = join(process.cwd(), uploadsPath)
                const publicPath = configService.get('paths.public')
                const publicFullPath = join(process.cwd(), publicPath)
                const tempPath = configService.get('paths.temp')
                const tempFullPath = join(process.cwd(), tempPath)
                await FileUtils.CreateFolder(uploadsFullPath)
                await FileUtils.CreateFolder(publicFullPath)
                return [
                    { rootPath: uploadsFullPath, serveRoot: '/uploads' },
                    { rootPath: publicFullPath, serveRoot: '/public' },
                    { rootPath: tempFullPath, serveRoot: '/temp' },
                ]
            },
        }),
    ],
})
export class MyStaticServerModule {}
