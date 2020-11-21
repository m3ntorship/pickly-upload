import multer from 'multer';
import minioStorage from 'multer-minio-storage';
import config from 'config';
import minioClient from './client';
import { generateFileName } from '../../multer';
import client from './client';

const bucket: string = config.get('upload_providers.minio.bucket');

let key: string; // caching the key to use it when making url

const generateKey = (mimetype: string) => {
  key = generateFileName(mimetype);
};

export default multer({
  storage: minioStorage({
    minioClient,
    bucket,
    key: (req, file, cb) => {
      generateKey(file.mimetype);
      cb(null, key);
    },
    metadata: async (req, file, cb) => {
      try {
        const url = await client.presignedGetObject(bucket, key);
        return cb(null, { fieldName: file.fieldname, url });
      } catch (error) {
        return cb(error);
      }
    },
    contentType: (req, file, cb) => cb(null, file.mimetype)
  })
});
// in minioStorage storage engine options, key must be called before metadata
// to be able to cache the key value and use it later in metadata
