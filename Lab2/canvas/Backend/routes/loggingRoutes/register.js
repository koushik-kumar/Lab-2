var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var {Users} = require('./../../model/users');

const bcrypt = require('bcrypt');



// module.exports.register = function(req,res){
routerr.post('/register', (req, res) => {
  
  const saltRounds = 10;
  var encryptedString;

  console.log("Backend: -------------- Inside register user:"+JSON.stringify(req.body))

  hash = bcrypt.hashSync(req.body.password, saltRounds);
    // Store hash in your password DB.
  console.log("Backend: -------------- Encrypted Password: "+hash);
  console.log("req",req.body);
  var now = new Date().now;
  var user = new Users({
    "Role":req.body.role,
    "FirstName":req.body.first_name,
    "LastName":req.body.last_name,
    "Email":req.body.email,
    "Password":hash,
    "ProfilePicID":req.body.profilePicID,
    "PhoneNo":req.body.phoneNo,
    "AboutMe":req.body.aboutMe,
    "City":req.body.city,
    "Country":req.body.country,
    "Company":req.body.company,
    "School":req.body.school,
    "HomeTown":req.body.homeTown,
    "Languages":req.body.languages,
    "Gender":req.body.gender,
    "UserID":req.body.userID,
    "created":now,
  })


    // connection.query('INSERT INTO Users SET ?',newUser, function (error, results, fields) {
  user.save().then((user) => {
    console.log("Successfully Registered User")

      // if (error) {
        // console.log(error.stack);
      //   res.json({
      //     status:false,
      //     message:"there are some error with query"
      // });
      // res.status(400);
      // res.end("Invalid password or userID - "+error.message);
      // }else{
    res.cookie('userID', req.body.userID, { maxAge: 900000, httpOnly: false, path: '/' });
    req.session.userID = req.body.userID;
        // res.json({
        //   status:true,
        //   data:results,
        //   message:'user registered sucessfully'
        // });
    res.status(201);
    res.end("Successfully Registered User");
    }, (error) => {
      console.log("Error in User Registration"+error.stack);
      res.status(400);
      res.end("Error in User Registration "+error.message);
    })

  })

  module.exports=routerr