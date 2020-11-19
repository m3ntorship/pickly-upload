import { Client } from 'minio';
import config from 'config';

const endPoint: string = config.get('upload_providers.minio.endPoint');
const useSSL: boolean = config.get('upload_providers.minio.useSSL');
const accessKey: string = config.get('upload_providers.minio.accessKey');
const secretKey: string = config.get('upload_providers.minio.secretKey');

export default new Client({
  endPoint,
  useSSL,
  accessKey,
  secretKey
});
