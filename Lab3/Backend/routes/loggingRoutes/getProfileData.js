var routerr = require("express").Router();
var kafka = require('./../../kafka/client');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});


// var connection = require("../../config/mysqlDBConfig.js");
routerr.post("/getProfileData", requireAuth, function (req, res) {

  console.log('=========================Inside Backend - Get Profile Data =========================');
  console.log('Request Body: ', req.body);

  kafka.make_request('getProfileData', req.body, function (err, result) {

    console.log('========================= In the make request - Get Profile Data =========================');
    console.log('results', result);

    if (err) {
      console.log('Error in getting profile data');
      res.writeHead(400, {
        'Content-type': 'text/plain'
      });
      res.end('Error in getting profile data');
    } else if (result) {
      console.log("User details rendered successfully");
      res.writeHead(200, {
        'Content-type': 'text/plain'
      });
      res.end(JSON.stringify(result));
    } else if (result == null) {
      console.log("User doesn't exist");
      res.writeHead(210, {
        'Content-type': 'text/plain'
      });
      res.end('User does not exist');
  }


  })
})
module.exports = routerr;
