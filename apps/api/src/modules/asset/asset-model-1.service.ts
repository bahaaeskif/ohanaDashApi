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
//     // resizeImage(
//     // 	image: Express.Multer.File,
//     // 	width: number = +environment.static.imageResize
//     // ) {
//     // 	return new Promise((resolve: Function) => {
//     // 		Jimp.read(image.path, (err: any, img: any) => {
//     // 			if (!err) {
//     // 				if (
//     // 					["jpg", "jpeg", "png"].includes(
//     // 						img.getMIME().toLowerCase().replace("image/", "")
//     // 					)
//     // 				) {
//     // 					let aspect = 1;
//     // 					const max_width = width;

//     // 					let max_height = 1;
//     // 					if (img.getWidth() > max_width) {
//     // 						aspect = img.getHeight() / img.getWidth();
//     // 						max_height = max_width * aspect;
//     // 						const splitImage = image.filename.split(".");
//     // 						img.resize(max_width, max_height)
//     // 							.quality(75)
//     // 							.write(
//     // 								`${image.destination}/${splitImage[0]}Large.${splitImage[1]}`
//     // 							);
//     // 						img.resize(max_width / 2, max_height / 2)
//     // 							.quality(75)
//     // 							.write(
//     // 								`${image.destination}/${splitImage[0]}Medium.${splitImage[1]}`
//     // 							);
//     // 						img.resize(max_width / 3, max_height / 3)
//     // 							.quality(75)
//     // 							.write(
//     // 								`${image.destination}/${splitImage[0]}Small.${splitImage[1]}`
//     // 							);
//     // 						fs.unlinkSync(image.path);
//     // 					}
//     // 				}
//     // 			}
//     // 			resolve();
//     // 		});
//     // 	});
//     // }
// }
