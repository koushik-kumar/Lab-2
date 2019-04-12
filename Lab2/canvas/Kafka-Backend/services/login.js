var Model = require('../DatabaseConnection');

function handle_request(message, callback) {
    console.log('Inside Kafka Method Get Message. Message ', message);


    Users.findOne({UserID: message.UserID})
        .then(user => {
            if(!user){
                console.log("User not found")
                // res.status(404)
                // res.send()
                callback(null, "User not found");

            }
            bcrypt
                .compare(message.password, user.Password)
                .then( areEqual => {
                    if(areEqual) {
                        console.log("Password validated successfully")
                        const payload = {
                            UserID: user.UserID,
                            FirstName: user.FirstName,
                            LastName: user.LastName,
                            Avatar: user.Avatar,
                            Role: user.Role
                        }
                        jwt.sign(payload, config.secret, {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('Error in token creation : ', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `JWT ${token}`,
                                    UserID: user.UserID,
                                    FirstName: user.FirstName,
                                    LastName: user.LastName,
                                    Avatar: user.Avatar,
                                    Role: user.Role
                                });
                            }
                        });
                    } else {
                        console.log("Authentication failed.");
                        res.status(401).json({success: false, message: 'Authentication failed. User not found.'});
                    }

                })
 
        })
}

exports.handle_request = handle_request;