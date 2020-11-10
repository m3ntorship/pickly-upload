import express, { Application, Request } from 'express';
import multer from 'multer';

const app: Application = express();

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

const upload: multer.Multer = multer({ fileFilter });
app.use(upload.array('options', 4));
app.use(express.json());

export default app;
