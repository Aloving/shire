const UserController = require('../User');
const UserModel = require('../../../models/User.model');
const chai = require('chai');
const sinon = require('sinon');

const { expect, should } = chai;

const fs = require('fs');

describe('"User" Controller-model', () => {
  const userData = {
    username: 'testx',
    password: 'test',
  };
  let instance = null
  beforeEach(() => {
    instance = new UserController(UserModel);
  });
  it('create', () => {
    const saveStub = sinon.stub(UserModel.prototype, 'save');
    const setPasswordStub = sinon.stub(UserModel.prototype, 'setPassword');

    return instance
      .create()
      .then(() => {
        sinon.assert.calledOnce(saveStub);
        sinon.assert.calledOnce(setPasswordStub);

        saveStub.restore();
        setPasswordStub.restore();
      });
  });
  it('read', () => {
    const findStub = sinon.stub(UserModel, 'find');
    const findOneStub = sinon.stub(UserModel, 'findOne');

    instance.read({ query: {} });
    instance.read({ query: {}, method: 'findOne' });

    sinon.assert.calledOnce(findStub);
    sinon.assert.calledOnce(findOneStub);

    findStub.restore();
    findOneStub.restore();
  });

  describe('update', () => {
    let saveStub = null;
    let setPasswordStub = null;

    beforeEach(() => {
      saveStub = sinon.stub(UserModel.prototype, 'save');
      setPasswordStub = sinon.stub(UserModel.prototype, 'setPassword');
      sinon.stub(UserModel, 'findById').resolves(new UserModel());
    });

    afterEach(() => {
      setPasswordStub.restore();
      saveStub.restore();
      UserModel.findById.restore();
    });

    it('without password', () => {
      return instance.update({
        id: 'test',
        payload: {
          username: 'test'
        }
      })
      .then(() => {
        sinon.assert.calledOnce(saveStub);
        sinon.assert.notCalled(setPasswordStub);
      });
    });

    it('with password', () => {
      return instance.update({
        id: 'test',
        payload: {
          username: 'test',
          password: 'test'
        }
      })
      .then(() => {
        sinon.assert.calledOnce(saveStub);
        sinon.assert.calledOnce(setPasswordStub);
      });
    })
  });
  it('delete', () => {
    const enh = UserModel;
    const removeStub = sinon.stub(UserModel, 'remove');

    instance.delete();

    sinon.assert.calledOnce(removeStub);
    removeStub.restore();
  });
});
