import multer, { diskStorage, memoryStorage } from 'multer';
import config from 'config';
import { fileFilter } from '../multer';
import { Request, RequestHandler } from 'express';
import imgur from "imgur";

const client_id: string = config.get('upload_providers.imgur.client_id');
const client_secret: string = config.get(
	'upload_providers.imgur.client_secret'
);

// const client = new Client({
// 	client_id,
// 	client_secret,
// });

export const upload_imgur: (
	fieldName: string,
	maxCount?: number
) => RequestHandler = (fieldName, maxCount) => {
	const upload = multer({
		fileFilter,
	});
	return upload.array(fieldName, maxCount);
	// return client.Image.upload(`${__dirname}/temp`);
};
