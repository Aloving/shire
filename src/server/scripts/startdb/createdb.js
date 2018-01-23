const mongoose = require('../../utils/mongoose');
require('../../models/User.model');
const { users } = require('./startdb');
const User = require('../../controllers/User.controller');

function open() {
  return new Promise((resolve) => {
    mongoose.connection.on('open', resolve);
  });
}

function dropDb() {
  const { db } = mongoose.connection;
  return new Promise(resolve => db.dropDatabase(resolve));
}

function requireModels() {
  const promises = Object.keys(mongoose.models).map((modelName) => {
    const mongoosePromise = mongoose.models[modelName].ensureIndexes();
    return mongoosePromise;
  });
  return Promise.all(promises);
}

function createUsers() {
  const promises = users.map((user) => {
    const newUser = User.createNewUser(user);
    return newUser;
  });
  return Promise.all(promises);
}

async function createDatabase() {
  await createUsers();
}

try {
  (async () => {
    await open();
    await dropDb();
    await requireModels();
    await createDatabase();
  })();
} catch (err) {
  console.log(err);
}
