import multer from 'multer';
import minioStorage from 'multer-minio-storage';
import minioClient from './client';

export default multer({
  storage: minioStorage({
    minioClient,
    bucket: 'pickly-dev',
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    contentType: (req, file, cb) => cb(null, file.mimetype)
  })
});
