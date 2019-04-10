var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var { Courses } = require('../../model/courses');
var { Users } = require('./../../model/users');


routerr.post('/waitlist1', (req, res) => {

    let courseeeeID = "2332"
    console.log("Inside KKK -------------------- ")
    let enrolledStudents
    Users.find({
        "coursesEnrolled.CourseID": courseeeeID
    }
        , function (err, user) {
            if (err) {
                console.log(err.message);
                res.status(400);
                res.json({
                    status: false,
                    message: 'Error in finding course with id:'+courseeeeID
                })
            } else if (user) {
                enrolledStudents = user.length
                console.log("Number of people for course of courseID:"+courseeeeID+" is :"+enrolledStudents)
                // res.end(enrolledStudents.toString)
                        Courses.findOne({
                            CourseID: courseeeeID
                        }, async function (err, course) {
                            if (err) {
                                console.log(err.message);
                                res.status(400);
                                res.json({
                                    status: false,
                    
                                    message: 'Error in finding course'
                                })
                            } else if (course) {
                                let enrollmentFlag
                                console.log("Course: ")
                                console.log(course.CourseName)
                                let capacity = course.CourseCapacity
                                let waitlistCapacity = course.WaitlistCapacity
                                console.log("Class capacity : " + capacity)
                                console.log("Waitilist capacity: "+waitlistCapacity)
                                let vacancy = capacity - course.StudentsEnrolled
                                // let waitlistVacancy = waitlist
                                let enrolledNumber = course.StudentsEnrolled
                                let totalCapacity  = capacity+waitlistCapacity


                                
                                // console.log("Vacancy: "+vacancy)
                                if(enrolledNumber<capacity) {
                                    console.log(vacancy > 0)
                                    // console.log("HHHHHHHHHHH")
                                    enrollmentFlag = 'enrolled'
                                    await Users.findOneAndUpdate(
                                        {UserID: req.body.UserID},
                                        {"$push": {
                                            coursesEnrolled : {
                                                "CourseID": req.body.CourseID,
                                                "TeacherID": req.body.TeacherID,
                                                "EnrollmentStatus" : enrollmentFlag
                                            }
                                            }
                                        }
                                    )
                                    res.status(200)
                                    res.end("Course added")
                                } else if(enrolledNumber >= capacity || enrolledNumber<totalCapacity ) {

                                    let waitlistNumber  = (enrolledNumber+1)-capacity
                                    enrollmentFlag = 'Waitlisted_'+waitlistNumber;
                                    await Users.findOneAndUpdate(
                                        {UserID: req.body.UserID},
                                        {"$push": {
                                            coursesEnrolled : {
                                                "CourseID": req.body.CourseID,
                                                "TeacherID": req.body.TeacherID,
                                                "EnrollmentStatus" : enrollmentFlag
                                            }
                                            }
                                        }
                                    )
                                    res.status(200)
                                    res.end("You are on waitlist number "+waitlistNumber)
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


            } else{
                res.end("Course with course id doesnt exist")
                console.log("Course with course id doesnt exist")
            }
        }
    )



})

module.exports = routerr
