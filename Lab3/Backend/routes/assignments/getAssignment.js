var router = require('express').Router();
var kafka = require('./../../kafka/client');

router.post('/getAssignment', function (req, res) {

  kafka.make_request('getAssignment', req.body, function (err, result) {

    if (result) {
      if (result.length > 0) {
        console.log("results", result[0].assignments)
        res.end(JSON.stringify(result[0].assignments))
      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Error ");
      }
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Error ");
    }


  })


})
router.post('/getAssDetails', function (req, res) {

  kafka.make_request('getAssDetails', req.body, function (err, results) {

    if (results) {
      if (results.length > 0) {
        arr = results[0].assignments
        console.log("inarray", arr)
        arr.forEach(function (assignment) {
          console.log(assignment)
          if (assignment.assID == req.body.assID) {
            res.end(JSON.stringify([assignment]))
          }
        })


      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Error");
      }
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Error");
    }
  })


})
module.exports = router