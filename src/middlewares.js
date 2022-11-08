export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wootube';
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
  // res.locals creates global variables.
};
