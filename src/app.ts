import express, { Application } from 'express';
import { upload_imgur } from './upload/providers/imgur/upload';
const app: Application = express();

app.use(upload_imgur('options', 4), (req, res, next) => {
		const optionsData = (req.files as Array<Express.Multer.File>).map(
			(option: any) => option.data
		);
		res.status(200).json({ optionsData });
});

app.use(express.json());

export default app;
