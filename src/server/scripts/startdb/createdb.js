const mongoose = require('../../utils/mongoose');
require('../../models/User.model');
const { users } = require('./startdb');
const User = require('../../controllers/controller-module/User');

/**
 * Opens connection to db
 * @return {Promise}
 */
function open() {
  return new Promise((resolve) => {
    mongoose.connection.on('open', resolve);
  });
}

/**
 * Drops database
 * @return {Promise}
 */
function dropDb() {
  const { db } = mongoose.connection;
  return new Promise(resolve => db.dropDatabase(resolve));
}

/**
 * Requires models
 * @return {Promise}
 */
function requireModels() {
  const promises = Object.keys(mongoose.models).map((modelName) => {
    const mongoosePromise = mongoose.models[modelName].ensureIndexes();
    return mongoosePromise;
  });
  return Promise.all(promises);
}

/**
 * Creates users
 * @return {Promise}
 */
function createUsers() {
  const promises = users.map((user) => {
    const newUser = User.createNewUser(user);
    return newUser;
  });
  return Promise.all(promises);
}

/**
 * Create database
 * @return {Promise}
 */
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
