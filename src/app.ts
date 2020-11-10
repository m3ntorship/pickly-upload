import express, { Application } from 'express';
import { AppError } from './util/appError';
import { errorHandler } from './util/errorHandler';

const app: Application = express();

app.use(express.json());

app.use(errorHandler);

export default app;
