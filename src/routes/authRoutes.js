import passport from 'passport';

export const Authroutes = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      // the string ('google') will go and find the strategy upstair
      scope: ['profile', 'email']
    })
  );

  // after the user come back from the Oauth flow,
  // passport middleware takes over right and says ok
  //I'm all done and pass it to the next middleware or handler and redirect to surveys
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'), // if someone need to authenticate with google use the (GoogleStrategy) and after the user is logged in redirect him to home
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // logout
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
