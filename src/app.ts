import express, { Application } from 'express';
import { upload_imgur } from './upload/providers/imgur';

const app: Application = express();

app.use(upload_imgur('options', 4), (req, res, next) => {
	res.status(404).send();
});

app.use(express.json());

export default app;
