var connection = require('../../config/mysqlDBConfig.js');
var routerr = require("express").Router();
var { Users } = require('./../../model/users');


var json = require('json');

// module.exports.updateProfile = function(req,res){
routerr.post("/updateProfile", function(req, res) {



  id = JSON.stringify(req.body.UserID);
  console.log("Inside profile update module");
  console.log("111111: "+req.body.contact+" 2222: "+req.body.biography+" 3333: "+req.body.links);

  Users.findOneAndUpdate(
    {UserID: req.body.UserID},
    {
      $set : {
        "PhoneNo" :req.body.contact,
        "AboutMe" :req.body.biography,
        "Links" : req.body.links
      }
    },
    {new : true},
    function (err, doc) {
      console.log("HUUHUHHUHHUHUHHU"+doc)
      res.send({ error: err, affected: doc });
      // db.close();
  }
  )

})

module.exports = routerr;
