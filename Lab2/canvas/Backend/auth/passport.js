const mongoose = require('mongoose');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var {Users} = require('./../model/users');
var config = require('./../config/settings')


module.exports = passport => {

    var options = {
        jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : config.secret
    }

    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        Users.findById(jwt_payload.UserID)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
}