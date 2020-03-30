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
// }, {
//   toJSON: {
//     tranform: (doc, ret) ={
//       delete ret.passwordHash;
//     }
//   }
});

schema.virtual('password').set(function(password) {
  //given a password, hash the passord and the nubmer of rounds while hashing
  const hash = hashSync(password, 14);
  this.passwordHash = hash;
});

schema.statics.authorize = function({ username, password }) {

};
//creates a web token for signup and login
schema.methods.authToken = function() {

};
//takes a token and finds the user that owns the token.
schema.staticsfindByToken = function(token) {

};

module.exports = mongoose.model('User', schema);
