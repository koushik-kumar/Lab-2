var routerr = require("express").Router();
var kafka = require('./../../kafka/client');

routerr.post("/updateProfile", function (req, res) {

  kafka.make_request('updateProfile', req.body, function (err, result) {
    console.log('========================= In the backend make request - Update Profile =========================');
    // console.log('results', result);
    if (err) {
      console.log('Error updating profile!');
      res.writeHead(400, {
        'Content-type': 'text/plain'
      });
      res.end('Error updating profile!');
    } else if (result) {
      console.log("Profile updated successfully.");
      res.writeHead(200, {
        'Content-type': 'text/plain'
      });
      res.end(JSON.stringify(result));
    }
  })
})

module.exports = routerr;
