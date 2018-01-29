const CRUDController = require('./CRUD');

/**
 * "Low-level abstraction" for User model
 * @extends CRUDController
 */
class UserControllerModel extends CRUDController {
  /**
   * USER create method, method creates one user for each call
   * @param  {String}  username Username for new user
   * @param  {[type]}  password Password for new user
   * @return {Promise}
   */
  async create({ username, password }) {
    const user = new this.Model({ username });
    user.setPassword(password);
    return user.save();
  }

  /**
   * USER read method
   * @param  {Object} query Query for request to model
   * @param  {String} [method='find' }] Which method
   * @return {Promise}
   */
  read({ query, method = 'find' }) {
    return this.Model[method](query);
  }

  update({ query, payload }) {
    return this.Model.findOneAndUpdate(query)
  }
}

module.exports = UserControllerModel;
