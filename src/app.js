// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GoogleClientID, GoogleClientSecret } from '../config/keys';
import logger from 'morgan';
import { Authroutes } from './routes/authRoutes';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

passport.use(
  new GoogleStrategy(
    {
      clientID: GoogleClientID,
      clientSecret: GoogleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Access token', accessToken);
      console.log('Refresh Token', refreshToken);
      console.log('profile', profile);
    }
  )
); // create a new instance of the new google passport strategy, hey application i want to authenticate my user with google

Authroutes(app);

app.get('/', (req, res, next) => {
  res.send({ message: 'Welcome to  Emaily app..' });
});

export default app;
