// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.send({ message: 'Welcome to the Emaily Feedback...' });
});

export default app;
