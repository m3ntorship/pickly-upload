import multer from 'multer';
import { fileFilter } from '../../multer';
import { storage } from './storage';

export default multer({
  fileFilter,
  storage
});
