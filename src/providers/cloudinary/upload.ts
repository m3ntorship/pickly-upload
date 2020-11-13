import multer from 'multer';
import { fileFilter } from '../../multer';
import { storage } from './client';

export const upload_cloudinary: multer.Multer = multer({
	fileFilter,
	storage,
});
