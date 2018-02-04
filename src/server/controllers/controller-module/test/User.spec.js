const UserControllerModule = require('../User');
const UserControllerModel = require('../../controller-model/User');
const sinon = require('sinon');

describe('User controller-module', () => {
  it('createNewUser', () => {
    const createStub = sinon.stub(UserControllerModel.prototype, 'create');

    UserControllerModule.createNewUser();

    sinon.assert.calledOnce(createStub);
    createStub.restore();
  });
  it('findByUserName', () => {
    const readStub = sinon.stub(UserControllerModel.prototype, 'read');

    UserControllerModule.findByUserName();

    sinon.assert.calledOnce(readStub);
    readStub.restore();
  });
});
