import { StorageEngine } from 'multer';
import { Request } from 'express';
import concat from 'concat-stream';
import { Client } from '@rmp135/imgur';

export const imgurStorage: (client: Client) => StorageEngine = (client) => {
	const _handleFile = (
		req: Request,
		file: Express.Multer.File,
		cb: (error?: any, info?: Partial<Express.Multer.File>) => void
	) => {
		if (!file.mimetype || !file.mimetype.match(/image/gi)) {
			return cb(new Error('File is not of image type'));
		}
		file.stream.pipe(
			concat((data) => {
				client.Image.upload(data)
					.then((res) => {
						let apiRes: any = res;
						cb(null, apiRes);
					})
					.catch((err) => {
						console.log(err);
						cb(err);
					});
			})
		);
	};

	const _removeFile: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error) => void
	) => void = (req, file, cb) => {};

	return { _handleFile, _removeFile };
};
