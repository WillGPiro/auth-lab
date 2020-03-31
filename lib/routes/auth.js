const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()

//create a new user (POST ROUTE)
//create a JWT
//send the user and JWT
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        //creates a JWT token
        const token = user.authToken();
        //send the user and JWT store user token in cookie
        res.cookie('session', token, { 
          maxAge: ONE_DAY_IN_MS,
          httpOnly: true // our front end javascript won't be able to read token. It's only sending it cant read. 
        });
        res.send(user);
      })
      .catch(next);
  })

  //to create a login authorize takes username and password. Luckily our body has both. 
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        const token = user.authToken();
        res.cookie('session', token, {
          maxAge: ONE_DAY_IN_MS,
          httpOnly: true
        });

        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
  //send an error if the person is NOT logged in (handled by ensureAUth middlware)

    res.send(req.user);
  });
    
 





