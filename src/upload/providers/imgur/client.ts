import config from 'config';
import { Client } from '@rmp135/imgur';
//@rmp135/imgur (typescript imgur client package)

const client_id: string = config.get('upload_providers.imgur.client_id');
const client_secret: string = config.get(
	'upload_providers.imgur.client_secret'
);

export const client = new Client({
	client_id,
	client_secret,
});
