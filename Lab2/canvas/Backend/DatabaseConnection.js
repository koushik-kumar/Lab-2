var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin@cluster0273-5jsyb.mongodb.net/canvasDB');

var Users = mongoose.model('Users', {
    Role: {
        type: String
    },
    UserID: {
        type: Number,
        required: true,
        unique: true
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Avatar: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    ProfilePicID: {
        type: String
    },
    PhoneNo: {
        type: Number,
        unique: true
    },
    AboutMe: {
        type: String
    },
    City: {
        type: String
    },
    Country: {
        type: String
    },
    Company: {
        type: String
    },
    School: {
        type: String
    },
    HomeTown: {
        type: String
    },
    Languages: {
        type: String
    },
    Gender: {
        type: String
    },
    Links: {
        type: String
    },
    Created: {
        type: Date,
        default :   Date.now
    },
    // courses: {
    //     type: Array
    // },
    coursesEnrolled: {
        type: Array
    },
    coursesWaitingList:{
        type: Array
    },
    Links: {
        type: String
    }
});

var Courses= mongoose.model('Courses', {
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
});

const permissionNbrs = mongoose.model('permissionNbrs', {
    WaitListNumber: {
        type: Number,
        required: true,
        unique: true
    },
    CourseID: {
        type : String,
        required:true
    },
    TeacherID: {
        type : String,
        required:true
    },
    Validity : {
        type : String,
        required:true
    },
    StudentID : {
        type: Number
    }
})


var Question= mongoose.model('Question', {
    QID : {
        type : String,
        required:true
    },
    Question :{
        type : String,
        required:true
    },
    Answer1 : {
        type : String
    },
    Answer2 : {
        type : String
    },
    Answer3 : {
        type : String
    },
    Answer4 : {
        type : String
    }
})

module.exports = {
    Users,
    Courses,
    permissionNbrs,
    Question
};

