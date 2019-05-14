const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
var config = require("./../config/settings");
var Model = require('./../DatabaseConnection');

module.exports = passport => {
    var options = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };

    passport.use(
        new JWTStrategy(options, (jwt_payload, callback) => {
            Model.Users.findOne(
                {
                    UserID: jwt_payload.UserID
                },
                (err, user) => {
                    if (user) {
                        delete user.Password;
                        callback(null, user);
                    } else {
                        callback(err, false);
                    }
                }
            );
        })
    );
};
