var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var { Courses } = require('../../model/courses');
var { Users } = require('./../../model/users');

const bcrypt = require('bcrypt');



// module.exports.register = function(req,res){
routerr.post('/createCourse', (req, res) => {


  console.log("Backend: -------------- Inside addCourse route");

  console.log("req", req.body);

  Users.findOne({
    UserID: req.body.UserID
  }, function (err, user) {
    if (err) {
      console.log(err.message);
      res.status(400);
      res.json({
        status: false,
        message: 'User doesnt exist.'
      })
    } else if (user) {

      var now = new Date().now;
      var course = new Courses({
        "CUID": req.body.CUID,
        "CourseID": req.body.CourseID,
        "TeacherID": req.body.UserID,
        "CourseName": req.body.CourseName,
        "CourseDept": req.body.department,
        "CourseDescription": req.body.description,
        "CourseRoom": req.body.room,
        "CourseCapacity": req.body.capacity,
        "WaitlistCapacity": req.body.waitlist,
        "StudentsEnrolled" : 0,
        "CourseTerm": req.body.term,
        "cardColor": req.body.color,
        "created": now
      })


      course.save().then((course) => {
        
        console.log("Updating User data")
        console.log("Successfully Added a course")

        Users.findOneAndUpdate(
          {UserID: req.body.UserID},
          {$push: {
              coursesEnrolled : {
                  "CourseID": req.body.CourseID,
                  "TeacherID": req.body.UserID,
                  "EnrollmentStatus" : "Course Teacher"
              }
            }
          }, function(err, user){
            if(err){
            console.log(err)
            } else
            console.log(user)
          }
        )

        // sessionStorage.setItem('courseCards', (sessionStorage.getItem('courseCards')). )
        // 


        res.json({
          status:true,
          message:'Successfully created a course'
        });
        res.status(201);
        res.end("Successfully created a course");
      }, (error) => {
        console.log("Error in Course creation " + error.stack);
        res.status(400);
        res.end("Error in Course creation :" + error.message);
      })


      

    }
  })
})

  module.exports = routerr