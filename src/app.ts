import express, { Application } from 'express';
import { upload_imgur } from './upload/providers/imgur';
import { Client } from '@rmp135/imgur';
import config from 'config';

const app: Application = express();

const client_id: string = config.get('upload_providers.imgur.client_id');
const client_secret: string = config.get(
	'upload_providers.imgur.client_secret'
);
let client = new Client({
	client_id,
	client_secret,
});

client.Image.upload;
app.use(upload_imgur('options'), async (req, res, next) => {
	try {
		const apiRes = await client.Image.upload(req.file.buffer);
		res.status(200).json({ apiRes });
	} catch (error) {
		res.status(404).json({ error });
	}
});

app.use(express.json());

export default app;
