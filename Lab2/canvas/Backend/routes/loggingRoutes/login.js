// var connection = require('../../config/mysqlDBConfig.js');

var {Users} = require('./../../model/users');
var routerr = require('express').Router();

var json = require('json');
const bcrypt = require('bcrypt');

// var localStorage = require('localStorage');

// module.exports.login=function(req,res){
    routerr.post('/login', function (req, res) {

    console.log("BACKEND: ------- INSDIE LOGIN"+JSON.stringify(req.body));

    Users.findOne({
        UserID: req.body.UserID
    },function(err, user){
        if (err) {
            // console.log("Firsddddddddddddddddddddddddddddddddddddddddddddddddddt error.....");
            console.log(err.message);
            res.status(400);
            res.json({
            status:false,
            message:'UserID doesnt exist.'
            })
        }else  if (user) {
            // var userIDcookie;
            // if(results.length >0){
                // results.filter(function(user){
                    // console.log("SECONDDDDDDDddddddddddDDDDDDDD error.....");
                    bcrypt
                    .compare(req.body.password, user.Password)
                    .then(resl => {
                        if(resl){
                            console.log("Password Validation - "+resl);
                            res.cookie('userID', user.UserID, { maxAge: 900000, httpOnly: false, path: '/' });
                            req.session.userID = user.UserID;
                            console.log("Successful Login  :"+user.UserID);
                            res.status(200);
                            res.send("Successful Login");
                        } 
                        else{
                            console.log("Invalid password"+user.UserID);
                            res.status(400);
                            res.send("Invalid password or userID");
                        }
                        
                    })
                    .catch(err =>{
                        console.error("ERROR:"+err.message);
                    } );
                // })
        //     }else {
        //         // console.log("Thirddddddddddddddddddddddddddddddddddddddddddd error.....");
        //         console.error("User ID does not exits! Signup.");
        //         // res.json({
        //         //     status:false,    
        //         // message:"User ID does not exits! Signup."
        //         // });
        //         res.status(400);
        //     res.send("User ID does not exits! Signup.");
        // }
    //   console.log(results);
        }
    });
});

module.exports=routerr
