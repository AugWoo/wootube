import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wootube';
  res.locals.loggedInUser = req.session.user || {};
  next();
  // res.locals creates global variables.
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/');
  }
};

export const uploadFiles = multer({ dest: 'uploads/' });

export const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
});
