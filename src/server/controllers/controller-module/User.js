const UserModel = require('../../models/User.model');
const UserControllerModel = require('../controller-model/User');

/**
 * "Top level abstraction" for work with user model
 * @extends UserControllerModel
 */
class UserController extends UserControllerModel {
  /**
   * Create new User
   * @param  {String} username Username for new User
   * @param  {String} password Password for new user
   * @return {Promise}
   */
  createNewUser({ username, password }) {
    return this.create({ username, password });
  }

  /**
   * Find user by username, it returns only one record
   * @param  {String} username Username for request query
   * @return {Promise}
   */
  findByUserName(username) {
    return this.read({
      method: 'findOne',
      query: { username },
    });
  }
}

module.exports = new UserController(UserModel);
