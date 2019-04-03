var mongoose = require('mongoose');

const EnrollmentSchema= new mongoose.Schema({
    CourseID : {
        type : String,
        required:true
    },
    EnrollmentID :{
        type : String,
        unique : true
    },
    EnrollmentStatus : {
        type : String,
        required:true
    },
    Role : {
        type : String,
        required:true
    },
    CourseTeacherID : {
        type : Number,
        required:true
    },
    cardColor : {
        type : String,
        // required:true
    },
    Assignment : {
        type : String,
        // required:true
    },
    Announcements : {
        type : Number,
        // required:true
    },
    Quizzes : {
        type : String,
        // required:true
    }
})

var Enrolled = mongoose.model('Enrolled',EnrollmentSchema);

module.exports = {Enrolled};
