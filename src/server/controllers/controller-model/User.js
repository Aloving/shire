const CRUDController = require('./CRUD');

/**
 * "Low-level abstraction" for User model
 * @extends CRUDController
 */
class UserControllerModel extends CRUDController {
  /**
   * USER create method, method creates one user for each call
   * @param  {String}  username Username for new user
   * @param  {String}  password Password for new user
   * @return {Promise}
   */
  async create({ username, password } = {}) {
    const user = new this.Model({ username });
    user.setPassword(password);
    return user.save();
    // user.save().then(res => {
    //   console.log('res')
    //   console.log('res')
    //   console.log(res)
    // }).catch(err => {
    //   console.log('err')
    //   console.log('err')
    //   console.log(err)
    // })
  }

  /**
   * USER read method
   * @param  {Object} query Query for request to model
   * @param  {String} [method='find' }] Which method
   * @return {Promise}
   */
  read({ query, method = 'find' } = {}) {
    return this.Model[method](query);
  }

  /**
   * USER update method
   * @param  {String}  id User mongoose id
   * @param  {Object}  payload Update payload
   * @param  {String}  [payload.password] Password for update
   * @param  {String}  [payload.username] Username for update
   * @return {Promise}
   */
  async update({ id, payload: { password, username } = {} }) {
    const user = await this.Model.findById(id);

    if (username) {
      user.username = username;
    }

    if (password) {
      user.setPassword(password);
    }

    return user.save();
  }

  /**
   * USER delete method
   * @param  {String} id User mongoose id
   * @return {Promise}
   */
  delete(id) {
    return this.Model.remove({ _id: id });
  }
}

module.exports = UserControllerModel;
