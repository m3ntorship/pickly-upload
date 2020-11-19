import multer from 'multer';
import { Request } from 'express';
import createError from 'http-errors';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const acceptedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  if (acceptedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      createError(
        400,
        'please upload an image with one of the accepted formats: "image/jpg", "image/jpeg", "image/png" '
      )
    );
  }
};

export const fileName = (mimetype: string) => {
  const name: string = `${
    Math.random().toString().split('.')[1] + Date.now().toString()
  }.${mimetype.split('/')[1]}`;
  return name;
};
