var Model = require('./../DatabaseConnection');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');

// const localStrategy = require('passport-local').Strategy;
// var routerr = require('express').Router();



function handle_request(message, callback) {

    console.log('=========================Inside  Kafka Backend - Register =========================');
    console.log('Message', message);

    var now = new Date().now;

    Model.Users.findOne(
        { 'UserID': message.UserID },
        (err, user) => {
            if (err) {
                console.error("Error in user registration : " + err.message)
                callback(err, null)
            } else if (user) {
                console.error("UserID already exists!", err);
                callback(null, null);
            } else {
                const avatar = gravatar.url(message.UserID,
                    {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    }
                );

                var user = new Model.Users({
                    "Role": message.role,
                    "FirstName": message.first_name,
                    "LastName": message.last_name,
                    "Avatar": avatar,
                    "Email": message.email,
                    "Password": message.password,
                    "ProfilePicID": message.profilePicID,
                    "PhoneNo": message.phoneNo,
                    "AboutMe": message.aboutMe,
                    "City": message.city,
                    "Country": message.country,
                    "Company": message.company,
                    "School": message.school,
                    "HomeTown": message.homeTown,
                    "Languages": message.languages,
                    "Gender": message.gender,
                    "UserID": message.userID,
                    "created": now,
                    "Links": message.links
                });

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.error('Error in salt generation', err)
                        callback(err, null)

                    }
                    else {
                        bcrypt.hash(user.Password, salt, (err, hash) => {
                            if (err) {
                                console.error('Error in password encryption', err)
                                callback(err, null)
                            } else {
                                user.Password = hash
                                user
                                    .save()
                                    .then((user) => {
                                        console.log("Successfully Registered User", user)
                                        // res.send(user)
                                        callback(null, user)
                                    });
                            }

                        })
                    }
                })
            }
        })
}
exports.handle_request = handle_request;