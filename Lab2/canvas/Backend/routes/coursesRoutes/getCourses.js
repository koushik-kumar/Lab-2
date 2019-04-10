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
    },async function(err, user){
      if(err) {
        console.log(err.message)
        res.status(400);
        res.json({
          status:false,
          message:'UserID doesnt exist.'
        })
      }else if (user) {
        // console.log("Inside get ccourse - user found")
        let getCourses = []
        let numberOfCoursesEnrolled = JSON.stringify(user.coursesEnrolled.length);
        // console.log("Verifying: "+JSON.stringify(user.coursesEnrolled.length))
        for(let i =0; i<numberOfCoursesEnrolled; i++){

          await Courses.findOne({
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
              // console.log("MINION--------")
              // console.log(course)
              let requiredArray = {  CourseID:  course.CourseID,
                                      CourseName: course.CourseName,
                                      TeacherID:  course.TeacherID,
                                      CourseName: course.CourseName,
                                      CourseTerm: course.CourseTerm,
                                      cardColor:  course.cardColor
                                  }
                                  console.log("course array each")
                                  console.log(requiredArray)
               getCourses.push(requiredArray)
            }
          })
        }
          
        
        // setTimeout(() => {
          console.log("courseTeacherIDs :"+getCourses)
          res.send(getCourses)
            res.status(200);
        // }, 500)
      }
      })
})

module.exports=routerr
