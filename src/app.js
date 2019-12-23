import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import keys from '../config/keys';
import passport from 'passport';
import logger from 'morgan';
import BodyParser from 'body-parser';
import { Authroutes } from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';
import './services/passport';
import './models/User';

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
app.use(BodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days => 24 hours => 60 minutes => 60 second =>  1000 millisecond, last after 30days
    keys: [keys.cookieKey] // encrypt our cookie
  })
);

// tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

Authroutes(app);
billingRoutes(app); // will immediately call with the  express app object


// Run if we are in production
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js, or main.css file!
  app.use(express.static('client-emaily/build'));
  // Express will serve up the app.js file
  // if it doesn't recognize the app
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-emaily', 'build', 'index.html'));
  })
}

app.get('/', (req, res, next) => {
  res.send({ message: 'Welcome to  Emaily app..' });
});

export default app;
