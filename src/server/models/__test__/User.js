const dirtyChai = require('dirty-chai');
const Model = require('../User.model');
const chai = require('chai');

const { expect, should } = chai;

should();
chai.use(dirtyChai);

describe('User model', () => {
  const randomPassword = () => String(Math.ceil(Math.random() * 1000));
  const userData = {
    login: 'test',
    password: 'test',
  };
  let instance = null;
  beforeEach(() => {
    instance = new Model();
  });
  describe('correct / uncorrect processes', () => {
    it('uncorrect / all empty params. Test validate', () => instance
      .validate()
      .then()
      .catch(({ errors: { salt, hash, login } }) => {
        expect(salt).to.exist();
        expect(hash).to.exist();
        expect(login).to.exist();
      }));

    it('correct process', (done) => {
      instance.login = userData.login;
      instance.setPassword(userData.password);

      instance
        .validate()
        .then(() => done())
        .catch();
    });
  });
  describe('methods', () => {
    it('setSalt', () => {
      instance.setSalt();
      expect(instance.salt).to.exist();
    });
    it('setPassword', () => {
      instance.setPassword(userData.password);
      expect(instance.hash).to.exist();
    });
    describe('hashPassword', () => {
      it('correct', () => {
        instance.setSalt();
        const hash = instance.hashPassword(userData.password);
        instance.hashPassword(userData.password).should.be.equal(hash);
      });
      it('uncorrect', () => {
        instance.setSalt();
        const hash = instance.hashPassword(userData.password);
        instance.hashPassword(randomPassword()).should.be.not.equal(hash);
      });
    });
    describe('validPassword', () => {
      it('correct', () => {
        instance.setPassword(userData.password);
        expect(instance.validPassword(userData.password)).to.be.true();
      });
      it('uncorrect', () => {
        instance.setPassword(userData.password);
        expect(instance.validPassword(randomPassword())).to.be.not.true();
      });
    });
  });
});
