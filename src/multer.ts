import multer from 'multer';
import { Request } from 'express';

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const acceptedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
	if (acceptedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(
			new Error(
				'please upload an image with one of the accepted formats: "image/jpg", "image/jpeg", "image/png" '
			)
		);
	}
};

export const upload: multer.Multer = multer({ fileFilter });
