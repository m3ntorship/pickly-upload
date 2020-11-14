import express, { Application} from 'express';
import { upload } from './upload/multer';

const app: Application = express();

app.use(upload.array('options', 4), (req, res, next) => {
	res.status(404).send();
});
app.use(express.json());

export default app;
