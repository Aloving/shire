const UserModel = require('../../models/User.model');
const UserControllerModel = require('../controller-model/User');

class UserController extends UserControllerModel {
  createNewUser({ username, password }) {
    return this.create({ username, password });
  }

  findByUserName(username) {
    return this.read({
      method: 'findOne',
      query: { username },
    });
  }
}

module.exports = new UserController(UserModel);
