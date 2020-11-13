import express, { Application } from 'express';
import { upload_imgur } from './upload/providers/imgur';
const app: Application = express();

app.use(upload_imgur('options', 4), (req, res, next) => {
	try {
		const optionsData = (req.files as Array<Express.Multer.File>).map(
			(option: any) => option.data
		);
		res.status(200).json({ optionsData });
	} catch (error) {
		res.status(404).json({ error });
	}
});

app.use(express.json());

export default app;
