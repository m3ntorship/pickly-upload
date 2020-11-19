import multer from 'multer';
import minioStorage from 'multer-minio-storage';
import config from 'config';
import minioClient from './client';
import { fileName } from '../../multer';

const bucket: string = config.get('upload_providers.minio.bucket');

export default multer({
  storage: minioStorage({
    minioClient,
    bucket,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, fileName(file.mimetype)),
    contentType: (req, file, cb) => cb(null, file.mimetype)
  })
});
