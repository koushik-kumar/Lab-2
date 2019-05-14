var router = require('express').Router();

var Model = require('./../../DatabaseConnection');

router.post('/createAssignment', function (req, res) {
  console.log("=================Inside Assignment Creation==========" + req.body)


  Model.Courses.find({
    CourseID: req.body.CourseID
  }, {
    _id: 0,
    assignments: 1
  }, (err, results) => {

    if (err) {
      console.log("Error");
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Error");
    } else {
      console.log(results)
      arr = results[0].assignments
      if (arr.length > 0) {
        var max_id = arr[arr.length - 1].assID
      } else {
        var max_id = 0
      }

      Model.Courses.findOneAndUpdate({
        CourseID: req.body.CourseID
      }, {
        $push: {
          assignments: {
            assID: parseInt(max_id) + 1,
            name: req.body.asgmnt_name,
            due: req.body.asgmnt_due,
            marks: req.body.asgmnt_marks,
            atDate: req.body.atDate
          }
        }
      }, {
        upsert: true
      }, function (err, result) {
        if (err)
          return res.send(500, {
            error: err
          });
        else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          console.log("Successfully created")
          res.end();
        }

      });

    }

  })

});

module.exports = router