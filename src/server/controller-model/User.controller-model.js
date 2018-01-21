const User = require('../models/User.model');

class UserControllerModel {
  static createUser({ username, password }) {
    const user = new User({ username });
    user.setPassword(password);
    return user.save();
  }
}

module.exports = new UserControllerModel();
