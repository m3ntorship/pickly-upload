import express, { Application } from 'express';
import { upload_cloudinary } from './upload/providers/cloudinary/upload';

const app: Application = express();

app.use(upload_cloudinary.array('options', 5), (req, res, next) => {
	res.status(200).json({optionsData: req.files});
});

app.use(express.json());

export default app;
