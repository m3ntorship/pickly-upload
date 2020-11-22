import { Client } from 'minio';
import config from 'config';

const endPoint: string = config.get('upload_providers.minio.endPoint');
const protocol: string = config.get('upload_providers.minio.protocol');
const accessKey: string = config.get('upload_providers.minio.accessKey');
const secretKey: string = config.get('upload_providers.minio.secretKey');

const useSSL = protocol === 'https:';

export default new Client({
  endPoint,
  useSSL,
  accessKey,
  secretKey
});
