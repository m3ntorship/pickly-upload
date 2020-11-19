import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from 'config';
import { fileName } from '../../multer';

const cloud_name: string = config.get('upload_providers.cloudinary.cloud_name');
const api_key: string = config.get('upload_providers.cloudinary.api_key');
const api_secret: string = config.get('upload_providers.cloudinary.api_secret');
const folder_name: string = config.get('upload_providers.folder_name');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: folder_name || 'temp',
      public_id: fileName(file.mimetype)
    };
  }
});
