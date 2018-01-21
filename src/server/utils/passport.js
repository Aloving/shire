const passport = require('koa-passport');
const config = require('../../../config/server');
const User = require('../models/User.model');

const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwt.secretkey'),
}, async ({ username, password }, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user || !user.validPassword(password)) {
      return done(null, false, { 'login or password': 'is invalid' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
