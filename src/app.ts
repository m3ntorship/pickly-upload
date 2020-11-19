import express, { Application } from 'express';
import expressWinston from 'express-winston';
import config from 'config';
import { upload_cloudinary } from './upload/providers/cloudinary/upload';
import upload_minio from './upload/providers/minio/upload';
import client from './upload/providers/minio/client';
import logger from './util/logger';

const bucket: string = config.get('upload_providers.minio.bucket');

const app: Application = express();

app.use(express.json());

const blacklistedMetaFields: string[] = config.get(
  'logger.blacklistedMetaFields'
);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    headerBlacklist: ['authorization', 'cookie']
  })
);
app.use(upload_cloudinary.single('options'));
app.use(async (req, res, next) => {
  // const url = await client.presignedGetObject(
  //   bucket,
  //   '112608127241989431605798585706.jpeg'
  // );
  res.status(200).json({ optionsData: req.file });
});

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
    blacklistedMetaFields,
    headerBlacklist: ['authorization', 'cookie']
  })
);

export default app;
