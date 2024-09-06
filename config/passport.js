const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require('passport')
const User = require('../models/user');
const opts = {
    jwtFromRequest: (req) => req.cookies.jwt,  // Extract JWT from cookies
    secretOrKey: 'secret'  // Your secret key
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => done(err, false));
}));
