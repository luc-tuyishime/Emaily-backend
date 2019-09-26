import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import keys from '../../config/keys';
import '../models/User';

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GoogleClientID,
      clientSecret: keys.GoogleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // if our program runs into any proxy just do it
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a user with the given profile id
          done(null, existingUser);
        } else {
          // we don't have a new user user record with the given id, make a new record
          new User({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.emails,
            photo: profile.photos
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
); // create a new instance of the new google passport strategy, hey application i want to authenticate my user with google

passport.serializeUser((user, done) => {
  // take user model, put some piece of info in the cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // pull it back to the user
  User.findById(id).then(user => {
    done(null, user);
  });
});

// we have to call the (done) after we have done some work.
// (null) means there is no errors everything is fine.
