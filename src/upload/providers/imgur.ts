import multer, { StorageEngine } from 'multer';
import config from 'config';
import { Request, RequestHandler } from 'express';
import concat from 'concat-stream';
import { fileFilter } from '../multer';
import { Client } from '@rmp135/imgur';

const client_id: string = config.get('upload_providers.imgur.client_id');
const client_secret: string = config.get(
	'upload_providers.imgur.client_secret'
);

let client = new Client({
	client_id,
	client_secret,
});

const setupImgurStorage: () => StorageEngine = () => {
	const _handleFile = (
		req: Request,
		file: Express.Multer.File,
		cb: (error?: any, info?: Partial<Express.Multer.File>) => void
	) => {
		if (!file.mimetype || !file.mimetype.match(/image/gi)) {
			return cb(new Error('File is not of image type'));
		}
		let apiRes: any;
		file.stream.pipe(
			concat((data) => {
				client.Image.upload(data)
					.then((res) => {
						apiRes = res;
						cb(null, apiRes);
					})
					.catch((err) => {
						console.log(err);
						cb(err);
					});
			})
		);
		return undefined;
	};

	const _removeFile: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error) => void
	) => void = (req, file, cb) => {};

	return { _handleFile, _removeFile };
};

// const imgur_uploader: RequestHandler = async (req, res, next) => {
// 	const apiRes = await client.Image.upload(req.file.buffer);
// 	return apiRes;
// };
// const imgurStorage: StorageEngine = () => {};

export const upload_imgur: (
	fieldName: string,
	maxNum: number
) => RequestHandler = (fieldName, maxNum) => {
	const upload = multer({
		fileFilter,
		storage: setupImgurStorage(),
	});
	return upload.array(fieldName, maxNum);
};
