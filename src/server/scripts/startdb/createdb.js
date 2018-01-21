const mongoose = require('../../utils/mongoose');
const data = require('./startdb');
const User = require('../../controllers/User.controller');

// async function start() {
//   try {
//     await User.createNewUser({
//       username: 'testx',
//       password: 'testx',
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
//
// start();

User.findByUserName('testx').then(console.log)
