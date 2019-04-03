// var connection = require("../../config/mysqlDBConfig.js");
var routerr = require('express').Router();

var json = require("json");
var express = require("express");
var session = require("express-session");
var {Users} = require('./../../model/users');
var { Courses } = require('../../model/courses');



var id, sql, role;

routerr.post('/getCourses', function (req, res) {
  console.log("BACKEND: --------- Inside GetCourses"+JSON.stringify(req.body));

  Users.findOne({
    UserID: req.body.UserID
    },function(err, user){
      if(err) {
        console.log(err.message)
        res.status(400);
        res.json({
          status:false,
          message:'UserID doesnt exist.'
        })
      }else if (user) {
        let getCourses = []
        let numberOfCoursesEnrolled = JSON.stringify(user.coursesEnrolled.length);
        // console.log("Verifying: "+JSON.stringify(user.coursesEnrolled.length))
        for(let i =0; i<numberOfCoursesEnrolled; i++){

          Courses.findOne({
            CourseID: (user.coursesEnrolled[i].CourseID)
          }, function (err1, course) {
            if (err1) {
                console.log(err1.message);
                res.status(400);
                res.json({
                    status: false,
                    message: 'CourseID doesnt exist.'
                })
            } else if (course) {
              let requiredArray = {  CourseID:  course.CourseID,
                                      CourseName: course.CourseName,
                                      TeacherID:  course.TeacherID,
                                      CourseName: course.CourseName,
                                      CourseTerm: course.CourseTerm,
                                      cardColor:  course.cardColor
                                  }
              getCourses.push(requiredArray)
            }
          })
        }

        setTimeout(() => {
          console.log("courseTeacherIDs :"+getCourses)
        }, 2000)
      }
        
        // for(let j=0; j<numberOfCoursesEnrolled;j++){
        //   Courses.findOne({
        //     CourseID: courseTeacherIDs[j]
        //   }, function (err1, course) {
        //     if (err1) {
        //         console.log(err1.message);
        //         res.status(400);
        //         res.json({
        //             status: false,
        //             message: 'CourseID doesnt exist.'
        //         })
        //     } else if (course) {
        //     }
        //   })
        // }
            //   Courses.findOne({
            //     CourseID: req.body.CourseID
            // }
        
      })
        // res.send(user.coursesEnrolled)
      // }
    // });

// module.exports.getCourses = function (req, res) {
  // console.log(localStorage.getItem('UserID'));
  // console.log('from session: ---'+(localStorage.getItem('userID')));

  // var role = connection.query("SELECT Role FROM Users where UserID="+id);

  // id = JSON.stringify(req.body.UserID);
  // console.log("Getting courses");
  // var roleQuery = "SELECT Role FROM Users where UserID=" + id;

  // connection.query(roleQuery, function (err, rslt, fiels) {
  //   if (err) {
  //     res.json({
  //       status: false,
  //       message: "there are some error with query"
  //     });
  //   } else {
  //     if (rslt.length > 0) {
  //       role = rslt[0]["Role"];
  //       console.log("User Role: " + role.toUpperCase());
  //       if (role.toUpperCase() === "STUDENT") {
  //         sql =
  //           "SELECT CoursesEnrollment.UserID,CoursesEnrollment.CourseID,CoursesEnrollment.enrollmentStatus,CoursesEnrollment.Role,CoursesEnrollment.cardColor,Courses.CourseTerm, Courses.CourseName FROM CoursesEnrollment INNER JOIN Courses ON CoursesEnrollment.CourseID=Courses.CourseID WHERE CoursesEnrollment.UserID=" +
  //           JSON.stringify(req.body.UserID);
  //       } else if (role.toUpperCase() === "PROFESSOR") {
  //         sql =
  //           "SELECT CourseID, CourseName, CourseTerm,cardColor FROM `Courses` WHERE CourseTeacherID = " +
  //           JSON.stringify(req.body.UserID);
  //       }

  //       connection.query(sql, function (err, results, fields) {
  //         console.log("Courses List from backend: " + JSON.stringify(results));
  //         if (results) {
  //           res.status(200);
  //           res.send(results);
  //         }
  //         else {
  //           res.json({
  //             status: false,
  //             message: "No courses."
  //           });
  //           res.status(204);
  //           res.end("No courses.");
  //         }
  //       });
  //     } else {
  //       res.json({
  //         status: false,
  //         message: "User Role not defined."
  //       });
  //       res.status(400);
  //       res.end("User Role not defined.");
  //     }
  //   }
  // });
})

module.exports=routerr
