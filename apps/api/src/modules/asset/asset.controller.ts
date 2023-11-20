import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import 'multer'

import { AssetService } from './asset.service'

@Controller('assets')
export class AssetController {
    constructor(private readonly assetService: AssetService) {}

    // @Get(':assetId')
    // async getImage(
    //     @Param('assetId') assetId: string,
    //     @Query('width') width: number,
    //     @Res() res: Response,
    // ) {
    //     const { resizedImage, mimeType } =
    //         await this.assetService.getResizedImage(assetId, width)
    //     res.setHeader('Content-Type', mimeType)
    //     return res.send(resizedImage)
    // }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile()
        file: Express.Multer.File,
    ) {
        return { url: file.path }
    }
}
