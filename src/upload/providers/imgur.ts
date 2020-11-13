import multer, { diskStorage, memoryStorage } from 'multer';
import config from 'config';
import { fileFilter } from '../multer';
import { Request, RequestHandler } from 'express';

export const upload_imgur: (
	fieldName: string,
	maxCount?: number
) => RequestHandler = (fieldName) => {
	const upload = multer({
		fileFilter,
		storage: memoryStorage(),
	});
	return upload.single(fieldName);
	// return client.Image.upload(`${__dirname}/temp`);
};
