import { Mongoose } from 'mongoose';
import { get } from 'config';
import app from './app';

const DB_URI: string = get('app.DB_URI');
const PORT: number = get('app.PORT');

const mongoose = new Mongoose({ useUnifiedTopology: true });

mongoose.connect(DB_URI, { useNewUrlParser: true }).then(() => {
  console.log('connected to db');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
