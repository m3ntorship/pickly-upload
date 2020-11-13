import multer from 'multer';
import { RequestHandler } from 'express';
import { fileFilter } from '../../multer';
import { imgurStorage } from './storageEngine';
import { client } from './client';

export const upload_imgur: (
	fieldName: string,
	maxNum: number
) => RequestHandler = (fieldName, maxNum) => {
	const upload = multer({
		fileFilter,
		storage: imgurStorage(client),
	});
	return upload.array(fieldName, maxNum);
};
