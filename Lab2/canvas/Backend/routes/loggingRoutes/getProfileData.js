var routerr = require("express").Router();
var { Users } = require("./../../model/users");
var { Courses } = require("../../model/courses");
var json = require("json");

// var connection = require("../../config/mysqlDBConfig.js");
routerr.post("/getProfileData", function(req, res) {
  console.log("Inside getProfileData");

  console.log(JSON.stringify(req.body));
  id = JSON.stringify(req.body.UserID);
  console.log("getting profile data of " + id);

  Users.findOne(
    {
      UserID: req.body.UserID
    },
    function(err, user) {
      if (err) {
        console.log(err.message);
        res.status(400);
        res.json({
          status: false,
          message: "UserID doesnt exist."
        });
      } else if (user) {
        console.log("User Details");
        console.log(user);
        res.status(200);
        res.send(user).end();
      }
    }
  );

});

module.exports = routerr;
