// var connection = require('../../config/mysqlDBConfig.js');
const passport = require('passport');
const gravatar = require('gravatar');

const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var {Users} = require('./../../model/users');
var routerr = require('express').Router();
var json = require('json');
var config = require('./../../config/settings')


routerr.post('/login', function (req, res) {

    console.log("BACKEND: ------- INSDIE LOGIN");


    Users.findOne({UserID: req.body.UserID})
        .then(user => {
            if(!user){
                console.log("User not found")
                res.status(404)
                res.send("User not found")
            }
            bcrypt
                .compare(req.body.password, user.Password)
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


    // Users.findOne({
    //     UserID: req.body.UserID
    // },function(err, user){
    //     if (err) {
    //         console.log(err.message);
    //         res.status(400);
    //         res.json({
    //         status:false,
    //         message:'UserID doesnt exist.'
    //         })
    //     }else  if (user) {
    //                 bcrypt
    //                 .compare(req.body.password, user.Password)
    //                 .then(resl => {
    //                     if(resl){
    //                         console.log("Password Validation - "+resl);
    //                         res.cookie('UserID', user.UserID, { maxAge: 900000, httpOnly: false, path: '/' });
    //                         req.session.UserID = user.UserID;
    //                         console.log("Successful Login  :"+user.UserID);
    //                         res.status(200);
    //                         console.log("Successful Login")
    //                         res.send(user.Role);
    //                     } 
    //                     else{
    //                         console.log("Invalid password"+user.UserID);
    //                         res.status(400);
    //                         res.send("Invalid password or userID");
    //                     }
                        
    //                 })
    //                 .catch(err =>{
    //                     console.error("ERROR:"+err.message);
    //                 } );
    //     }
    // });
});

module.exports=routerr
