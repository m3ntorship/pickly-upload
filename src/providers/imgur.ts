import { Client } from '@rmp135/imgur';
import multer, { memoryStorage } from 'multer';
import { get } from 'config';
import { fileFilter } from '../multer';

const client_id: string = get('providers.imgur.client_id');
const client_secret: string = get('providers.imgur.client_secret');

const client = new Client({
	client_id,
	client_secret,
});
export const upload_imgur = () => {
	const upload: multer.Multer = multer({
		fileFilter,
		//storage: memoryStorage,
	});
	//client.Image.upload();
};
