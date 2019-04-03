var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
var { Users } = require('./../../model/users');
var { Courses } = require('../../model/courses');


routerr.post('/enrollCourse', (req, res) => {


    console.log("Backend: -------------- Inside enrollCourse route:")
    console.log("req", req.body);


    Courses.findOne({
        CourseID: req.body.CourseID
    }, function (err1, course) {
        if (err1) {
            console.log(err1.message);
            res.status(400);
            res.json({
                status: false,
                
                message: 'CourseID doesnt exist.'
            })
        } else if (course) {
            console.log("Course: ")
            console.log(course)

            let capacity = course.CourseCapacity
            console.log("Class capacity : "+capacity)

            Users.findOne({ UserID: req.body.UserID }, function(err, user){
                if (err) {
                    console.log(err.message);
                    res.status(400);
                    res.json({
                    status:false,
                    message:'UserID doesnt exist.'
                    })
                }else  if (user) {
                    console.log("User: ")
                    console.log(user)
                    let role = (user.Role)
                    console.log("Role: ---------")
                    // console.log(role,role.toString() == '\"student\"')
                    console.log(role)

                    if(role == "student"){
                        
                        if(capacity>0){
                            console.log("seats available, enrolling...")
                            Users.findOneAndUpdate({
                                UserID: req.body.UserID
                            },
                                {"$push": {
                                    "coursesEnrolled" : {
                                        "CourseID": req.body.CourseID,
                                        "TeacherID": req.body.TeacherID,
                                    }
                                }
                            })
                            course.CourseCapacity--

                        }
                    } else {

                    }
                    // $push: {
                    //     coursesEnrolled: {
                    //         CourseID: req.body.CourseID,
                    //         TeacherID: req.body.TeacherID
                    //         // "Enrollment": ''
                    //     }
                    // }
                }
                // res.json({
                //     status: true,
                // message: 'CourseID doesnt exist.'
                // })
            }
            // , function(err2) {
            //     if (err2) {
            //         console.log("Problem in  enrolling the course!");
            //     }
            //     res.status(400);
            //     res.json({
            //         status: false,
            //         message: 'Problem in  enrolling the course!'
            //     })
            // }
            )
        }
    })
})

module.exports = routerr