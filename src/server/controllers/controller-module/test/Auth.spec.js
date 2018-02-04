const Auth = require('../Auth');
const chai = require('chai');

const { expect } = chai;

describe('Auth controller-module', () => {
  const userData = {
    username: 'test',
    password: 'test',
  };
  it('generate / decode', () => {
    const generatedToken = Auth.generateToken(userData);
    const decodedToken = Auth.decodeToken(generatedToken);

    expect(decodedToken).to.deep.include(userData);
  });
});
