var connection = require('./../../config/dbConfig.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var encryptedString;



module.exports.register = function(req,res){
  console.log("HEREEEEEE: --------"+JSON.stringify(req.body));

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  console.log("INSIDE NOW: PASSWORD: ----------"+hash);
    console.log("req",req.body);
    var now = new Date().now;
    var newUser={
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
    }


    connection.query('INSERT INTO Users SET ?',newUser, function (error, results, fields) {
      if (error) {
        console.log(error.stack);
      //   res.json({
      //     status:false,
      //     message:"there are some error with query"
      // });
      res.status(400);
      res.end("Invalid password or userID");
      }else{
        res.cookie('userID', req.body.userID, { maxAge: 900000, httpOnly: false, path: '/' });
        req.session.userID = req.body.userID;
        // res.json({
        //   status:true,
        //   data:results,
        //   message:'user registered sucessfully'
        // });
        res.status(201);
        res.end("Successfully Registered");
      }
    });
  });

  }