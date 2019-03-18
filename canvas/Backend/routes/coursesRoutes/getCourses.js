var connection = require("./../../config/dbConfig.js");
var json = require("json");

var express = require("express");
var session = require("express-session");

var id, sql, role;

module.exports.getCourses = function(req, res) {
  // console.log(localStorage.getItem('UserID'));
  // console.log('from session: ---'+(localStorage.getItem('userID')));

  // var role = connection.query("SELECT Role FROM Users where UserID="+id);
  id = JSON.stringify(req.body.UserID);
  console.log("Insided Get COurses: " + id);
  var roleQuery = "SELECT Role FROM Users where UserID=" + id;

  connection.query(roleQuery, function(err, rslt, fiels) {
    if (err) {
      res.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      if (rslt.length > 0) {
        role = rslt[0]["Role"];
        console.log("role--    :" + role.toUpperCase());
        if (role.toUpperCase() === "STUDENT") {
          sql =
            "SELECT CoursesEnrollment.UserID,CoursesEnrollment.CourseID,CoursesEnrollment.enrollmentStatus,CoursesEnrollment.Role,CoursesEnrollment.cardColor,Courses.CourseTerm, Courses.CourseName FROM CoursesEnrollment INNER JOIN Courses ON CoursesEnrollment.CourseID=Courses.CourseID WHERE CoursesEnrollment.UserID=" +
            JSON.stringify(req.body.UserID);
        } else if (role.toUpperCase() === "PROFESSOR") {
          sql =
            "SELECT CourseID, CourseName, CourseTerm,cardColor FROM `Courses` WHERE CourseTeacherID = " +
            JSON.stringify(req.body.UserID);
        }
        // console.log("SQL == " + sql);

        connection.query(sql, function(err, results, fields) {
          console.log(" HERE GETCOURSES: " + JSON.stringify(results));
          if(results){
            // res.json({
            //     status:true,
            // })
            res.status(200);
            res.send(results);
        } 
        else{
            res.json({
                status:false,
                message:"No courses."
            });
            res.status(204);
            res.end("No courses.");
        }
        });
      } else {
        res.json({
          status: false,
          message: "User Role not defined."
        });
        res.status(400);
        res.end("User Role not defined.");
      }
    }
  });
};
