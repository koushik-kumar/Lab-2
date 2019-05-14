var Model = require('./../DatabaseConnection');

function handle_request(message, callback) {
    console.log('=========================Inside  Kafka Backend - Get courses =========================');
    console.log('Message', message);

    Model.Users.findOne({
        'UserID': message.UserID
        },async function(err, user){
            if(err) {
                console.log("Error in finding userID", err.message)
                callback(err, null)
            }else if (user) {
                let getCourses = []
                let numberOfCoursesEnrolled = JSON.stringify(user.coursesEnrolled.length);
                for(let i =0; i<numberOfCoursesEnrolled; i++){
                    await Model.Courses.findOne(
                        {'CourseID': (user.coursesEnrolled[i].CourseID)},
                        function (err1, course) {
                            if (err1) {
                                console.log("CourseID doesnt exist."+err1.message);
                                callback(err1, null)
                            } else if (course) {
                                let requiredArray = {  
                                    CourseID:  course.CourseID,
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
                console.log("courseTeacherIDs :"+getCourses)
                callback(null, getCourses);
            }
        }
    )
}

exports.handle_request = handle_request;
