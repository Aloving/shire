const mongoose = require('../../utils/mongoose');
const data = require('./startdb');
const User = require('../../models/User.model');

function createUser() {
  const user = new User({
    username: 'test'
  });

  user.setPassword('test');
  return user.save();
}

async function start() {
  try {
    await createUser();
  } catch (err) {
    console.log(err);
  }
}

start();
