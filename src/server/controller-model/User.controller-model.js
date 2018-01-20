const User = require('../models/User.model');

class UserControllerModel {
  static createUser({ login, password }) {
    const user = new User({ login });
    user.setPassword(password);
    return user.save();
  }
}

module.exports = new UserControllerModel();
