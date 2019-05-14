var mongoose = require('mongoose');

const QuizSchema= new mongoose.Schema({
    QuizID : {
        type : String,
        required:true
    },
    CourseTeacherID :{
        type : String,
        required:true
    },
    Points : {
        type : Number,
    },
    Instrutions : {
        type : String,
        required:true
    },
    DueDate : {
        type : Date,
    },
    AvailableFrom : {
        type : Date,
    },
    AvailableTill : {
        type : Date,
    },
    Questions : {
        type : Array
    }
})

var Quiz = mongoose.model('Quiz',QuizSchema);

module.exports = {Quiz};
