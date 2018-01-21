const CRUDController = require('./CRUD.controller');

class UserControllerModel extends CRUDController {
  async create({ username, password }) {
    const user = new this.Model({ username });
    user.setPassword(password);
    return user.save();
  }

  read({ query = 'find', method }) {
    return this.Model[method](query);
  }
}

module.exports = UserControllerModel;
