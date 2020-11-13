import multer from 'multer';
import { fileFilter } from '../../multer';
import { imgurStorage } from './storageEngine';
import { client } from './client';

export const upload_imgur: multer.Multer = multer({
	fileFilter,
	storage: imgurStorage(client),
});
