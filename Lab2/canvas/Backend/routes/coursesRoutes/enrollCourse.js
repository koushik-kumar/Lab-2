var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var { Users } = require('./../../model/users');
var { Courses } = require('../../model/courses');


routerr.post('/enrollCourse', (req, res) => {

    console.log("Backend: -------------- Inside enrollCourse route:");
    console.log("req", req.body);


    Courses.findOne({
        CourseID: req.body.CourseID
    }, async function (err, course) {
        if (err) {
            console.log(err.message);
            res.status(400);
            res.json({
                status: false,
                message: 'CourseID doesnt exist.'
            })
        } else if (course) {
            console.log("Course: ")
            console.log(course.CourseName)
            

            let capacity = course.CourseCapacity;
            let waitlistCapacity = course.WaitlistCapacity;
            let enrolledNumber = course.StudentsEnrolled;
            let totalCapacity  = +capacity + +waitlistCapacity;

            if(course.StudentsEnrolled < capacity) {
                // console.log(vacancy > 0)
                // console.log("HHHHHHHHHHH")
                enrollmentFlag = 'enrolled'
                Users.findOneAndUpdate(
                    {UserID: req.body.UserID},
                    {"$push": {
                        coursesEnrolled : {
                            "CourseID": req.body.CourseID,
                            "TeacherID": req.body.TeacherID,
                            "EnrollmentStatus" : enrollmentFlag
                        }
                        }
                    },function(err, response) {
                        if (err) {
                        console.log("Error in Enrollment Student:"+err);
                       } else {
                            Courses.findOneAndUpdate(
                                { CourseID: req.body.CourseID},
                                {   $inc : {"StudentsEnrolled": 1}},
                                function(err, response) {
                                    if (err) {
                                        console.log("Error in updating Students Enrollment Count"+err);
                                    } else {
                                        console.log("Enrollment Status:"+enrollmentFlag+" \n");
                                        console.log("Updating students enrollment: \n"+response);
                                        res.status(200)
                                        res.end("Course added "+(+response.StudentsEnrolled + +1))
                                    }
                                }
                            )
                       }
                    }
                )
            } else if(course.StudentsEnrolled >= +capacity && course.StudentsEnrolled < +totalCapacity ) {

                let waitlistNumber=  (+course.StudentsEnrolled) - (+capacity)
                waitlistNumber = +waitlistNumber + +1
                enrollmentFlag = 'Waitlisted_'+waitlistNumber;
                Users.findOneAndUpdate(
                    {UserID: req.body.UserID},
                    {"$push": {
                        coursesEnrolled : {
                            "CourseID": req.body.CourseID,
                            "TeacherID": req.body.TeacherID,
                            "EnrollmentStatus" : enrollmentFlag
                        }
                        }
                    },function(err, response) {
                        if (err) {
                        console.log("Error in Enrollment Student:"+err);
                       } else {
                        console.log("Enrollment Status:"+enrollmentFlag+" \n"+response);
                        Courses.findOneAndUpdate(
                            { CourseID: req.body.CourseID},
                            {   $inc : {"StudentsEnrolled": 1}}, {new: true },function(err, response) {
                                if (err) {
                                console.log("Error in updating Students Enrollment Count"+err);
                               } else {
                                    console.log("Updating no. of students for enrollment: \n"+response);
                                    res.status(200)
                                    res.end("You are on waitlist number "+waitlistNumber)
                               }
                            }
                        )

                        
                       }
                    }
                )

                //Incrementing the enrollment number
                


                
            } else{
                console.log('Limit exceeded, no more availability for now')
                res.send('Limit exceeded, no more availability for now')
            }

            } else {
                // console.log(err.message);
                res.status(400);
                res.json({
                    status: false,
                    message: 'CourseID doesnt exist.'
                })
            }
        })
    })

module.exports = routerr