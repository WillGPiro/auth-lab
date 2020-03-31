const User = require ('../models/User');
module.exports = (req, res, next) => {
//read session cookie 'session' below is the same as session in our auth routes. We set cookie, then in our middleware we are grabbing cookie we set.
  const token = req.cookies.session;
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
