import express, { Application } from 'express';
import { upload_cloudinary } from './providers/cloudinary/upload';

const app: Application = express();

app.use(upload_cloudinary.array('options', 4), (req, res, next) => {
	res.status(404).send();
});

app.use(express.json());

export default app;
