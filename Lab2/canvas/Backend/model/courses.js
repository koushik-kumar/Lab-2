var mongoose = require('mongoose');

const CoursesSchema= new mongoose.Schema({
    CUID : {
        type : String,
        required:true,
        unique : true
    },
    CourseID: {
        type : String,
        required:true
    },
    TeacherID: {
        type : String,
        required:true
    },
    CourseName :{
        type : String,
        unique : true
    },
    CourseDept : {
        type : String,
        required:true
    },
    CourseDescription : {
        type : String,
        required:true
    },
    CourseRoom : {
        type : Number,
        required:true
    },
    CourseCapacity : {
        type : String,
        required:true
    },
    WaitlistCapacity : {
        type : String,
        // required:true
    },
    StudentsEnrolled: {
        type:Number,
    },
    CourseTerm : {
        type : String,
        required:true
    },
    cardColor : {
        type : String,
        // required:true
    }, 
    Announcements : {
        type : Array
    },
    Quizzes : {
        type : Array
    }
})

var Courses = mongoose.model('Course',CoursesSchema);

module.exports = {Courses};
