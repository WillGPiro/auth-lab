const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, 
//function that is called whenever we call toJSON
{
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

//given a password, hash the password and the nubmer of rounds while hashing/ only store password hash in our database
schema.virtual('password').set(function(password) {
  const hash = hashSync(password, Number(process.env.SALT_ROUNDS) || 14);
  this.passwordHash = hash;
});

schema.statics.authorize = async function({ username, password }) {
  //check that a user exists with username
  const user = await this.findOne({ username });
  if(!user) {
    //throw an error if no user
    const error = new Error('Invalid username/password');
    error.status = 403;
    throw error;
  }
  // check that the user with username has matching password. 
  const matchingPasswords = await compare(password, user.passwordHash);
  if(!matchingPasswords) {
    //throw an error if passwords do not match
    const error = new Error('Invalid username/password');
    error.status = 403;
    throw error;
  }
  //if both conditions are ture return the user
  return user; 
};
//creates a web token for signup and login. The Payload is an instance of our user. A token takes a payload and a password. We store the password in our .env file as a environment variable. 
schema.methods.authToken = function() {

  //the password hash is now deleted with our toJSON function above. 
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET);
  return token;
};
//takes a token and finds the user that owns the token.
schema.statics.findByToken = function(token) {
  try {
    //take a token
    const { payload } = verify(token, process.env.APP_SECRET);
    //most static methods allow you to return a promise, a sync function does not so we force a returned promise.
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    return Promise.reject(e);
  }
};

module.exports = mongoose.model('User', schema);
