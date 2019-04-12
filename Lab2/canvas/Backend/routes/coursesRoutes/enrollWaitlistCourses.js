var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var { Users } = require('./../../model/users');
var { Courses } = require('../../model/courses');
var {permissionNbr} = require('../../model/permissionNbr')



routerr.post('/enrollWListCourse', (req, res) => {

    console.log("Backend: -------------- Inside enrollCourse waitlist");


    permissionNbr.findOne(
        {WaitListNumber:req.body.permissionCode,
            Validity:"available"
        },
        async function(err, num) {
            if(err) {
                console.error(err.message);
                res.status(400);
                res.json({
                    status: false,
                    message: 'Error in finding the permission number'
                })
                res.send('Error in finding the permission number')
            } else if (num){
                console.log(num)
                
                // res.send(num)
                await Courses.findOne(
                    {CourseID: req.body.CourseID},
                    function(err, course) {
                        if(err) {
                            console.error(err.message);
                            res.status(400);
                            res.json({
                                status: false,
                                message: 'Error in finding the course'
                            })
                            res.send('Error in finding the course')
                        } else if (course){
                            Users.findOneAndUpdate(
                                {UserID: req.body.UserID},
                                {"$pull": {
                                        coursesWaitingList : {
                                            "CourseID": req.body.CourseID,
                                            "TeacherID": req.body.TeacherID
                                        }
                                    }
                                },
                                function(err, user) {
                                    if (err) {
                                        console.error("Error in deleting"+err);
                                        res.status(400)
                                        res.send("Error in deleting"+err)
                                    } else if(user) {
                                    //    console.log("Field updated")
                                    //    res.send('Field updated')
                                        Users.findOneAndUpdate(
                                            {UserID: req.body.UserID},
                                            {"$push": {
                                                    coursesEnrolled : {
                                                        "CourseID": req.body.CourseID,
                                                        "TeacherID": req.body.TeacherID,
                                                        "EnrollmentStatus" : "enrolled"
                                                    }
                                                }
                                            },
                                            function(err, response) {
                                                if (err) {
                                                    console.log("Error in Enrollment Student:"+err);
                                                } else {
                                                    permissionNbr.findOneAndUpdate(
                                                        { WaitListNumber: req.body.permissionCode },
                                                        {
                                                            "$push": {
                                                                Visibility: "expired"
                                                            }
                                                        }, function (err, pnn) {
                                                            if (err) {
                                                                console.error("Error changing availability"+err)
                                                            } else{
                                                                console.log("Updating the availability")
                                                                console.log("Enrollment Status: enrolled \n");
                                                                console.log("Updating students enrollment \n");
                                                                console.log(pnb)
                                                                res.status(200)
                                                                res.end("Course added "+(course.StudentsEnrolled))
                                                            }
                                                        }
                                                    )
                                                    

                                                    // Courses.findOneAndUpdate(
                                                    //     { CourseID: req.body.CourseID},
                                                    //     {   $inc : {"StudentsEnrolled": 1}},
                                                    //     function(err, response) {
                                                    //         if (err) {
                                                    //             console.log("Error in updating Students Enrollment Count"+err);
                                                    //             res.status(400)
                                                    //             res.send("Error in updating Students Enrollment Count"+err)
                                                    //         } else {
                                                    //             // num.Validity = "expired"
                                                                
                                                    //         }
                                                    //     }
                                                    // )
                                            }
                                            }
                                        )
                                   }
                                }
                            )
            
                            
            
                        } else {
                            res.status(400);
                            res.json({
                                status: false,
                                message: 'CourseID doesnt exist.'
                            })
                        }
                    }
                )

            }
        }
    )





})

module.exports = routerr
