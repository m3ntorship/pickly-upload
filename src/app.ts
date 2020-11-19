import express, { Application } from 'express';
import expressWinston from 'express-winston';
import config from 'config';
import { upload_cloudinary } from './upload/providers/cloudinary/upload';
import upload_minio from './upload/providers/minio/upload';
import client from "./upload/providers/minio/client";
import logger from './util/logger';

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

app.use(upload_minio.array('options', 4), (req, res, next) => {
  
  res.status(200).json({ optionsData: req.files });
});

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
    blacklistedMetaFields,
    headerBlacklist: ['authorization', 'cookie']
  })
);

export default app;
