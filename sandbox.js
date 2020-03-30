const User = require('./lib/models/User');
require('dotenv').config();
//we can checkout how our virutual password works by creating a user and running program . we have a password hash
const user = new User({
  username: 'spot',
  password: 'spotWasHere'
});
//the console log version of this password is only the has version not the actual password. 
console.log(user.toJSON());

console.log(user.authToken());

