var Model = require('./../DatabaseConnection');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
// var passport = require('passport');
// var requireAuthenticate = passport.authenticate('jwt', {session: false});



function handle_request(message, callback) {

    console.log('=========================Inside  Kafka Backend - UpdateProfile =========================');
    console.log('Message', message);


    Model.Users.findOneAndUpdate(
        {'UserID': message.UserID }, 
        {
            $set : {
                PhoneNo : message.contact,
                AboutMe : message.biography,
                Links : message.links
            }
        },
        {new : true},
        function (err, update) {
            if (err) {
                console.error("Error in profile update : " + err.message)
                callback(err, null)
            } else if (update) {
                console.error("Profile updated");
                callback(null, update);
            }
        }
    )
}
exports.handle_request = handle_request;