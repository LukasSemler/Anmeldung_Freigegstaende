export const ErrorHandler = (err, req, res, next) => {
  console.log(`Am Backend-Server ist ein Fehler aufgetreten --> ERROR: ${err}`);
  res.status(500).send('Sorry, but server has encountered an error');
};

export const NotFoundHandler = (req, res, next) => {
  res.status(404).send("Sorry, but server hasn't found this route");
};

export const HttpsRedirectHandler = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    console.log('Redirect');
    next();
  }
};
