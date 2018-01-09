
/**
* Eslint правило здесь выключенно потому-что класс представляет из себя абстракцию
* и методы не содержат реализации
*/

/* eslint class-methods-use-this: [
    "error",
    {"exceptMethods": ["create", "read", "update", "delete"] }
  ]
*/
class CRUDController {
  contructor(model) {
    this.model = model;
  }
  create() {}
  read() {}
  update() {}
  delete() {}
}

module.exports = CRUDController;
