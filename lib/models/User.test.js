const User = require('./User');
require('dotenv').config();

describe('User model', () => {
  it('hashes password', () => {
    const user = new User({
      username: 'will',
      password: 'willWashere'
    });
    //we only want the password Hash to exist, not the actual password. 
    expect(user.passwordHash).toEqual(expect.any(String));
    expect(user.toJSON().password).toBeUndefined();
  });
  //creates a JSON web token
  it('creates a jwt auth', () => {
    const user = new User({
      username: 'will',
      password: 'willWashere'
    });
    //expects a JSON web token
    const token = user.authToken();
    expect(token).not.toBeUndefined();
  });

  it('finds a user by token', () => {
    const user = new User({
      username: 'will',
      password: 'willWashere'
    });
    const token = user.authToken();

    return User
      .findByToken(token)
      .then(foundUser => {
        expect(foundUser.toJSON()).toEqual(user.toJSON());
      });
  });
});



