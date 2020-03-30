const User = require('./User');

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
});

