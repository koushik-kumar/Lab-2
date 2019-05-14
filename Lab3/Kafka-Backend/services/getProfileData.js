var Model = require('./../DatabaseConnection');

function handle_request(message, callback) {
    console.log('=========================Inside  Kafka Backend - Get Profile Data =========================');
    console.log('Message', message);

    Model.Users.findOne({
        'UserID': message.UserID
        }, function(err, user){
            if(err) {
                console.log("Error in finding user to retrieve profile data", err.message)
                callback(err, null)
            }else if (user) {
                console.log("Redering user details....")
                callback(null,user);
            } else {
                callback(null, null)
            }

        }
    )
}

exports.handle_request = handle_request;
