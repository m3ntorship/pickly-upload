import multer from 'multer';
import minioStorage from 'multer-minio-storage';
import config from 'config';
import minioClient from './client';

const bucket: string = config.get('upload_providers.minio.bucket');

export default multer({
  storage: minioStorage({
    minioClient,
    bucket,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: function (req, file, cb) {
      cb(
        null,
        `${Math.random().toString().split('.')[1] + Date.now().toString()}.${
          file.mimetype.split('/')[1]
        }`
      );
    },
    contentType: (req, file, cb) => cb(null, file.mimetype)
  })
});
