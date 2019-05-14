var mongoose = require('mongoose');

const QuestionsSchema= new mongoose.Schema({
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

var Questions = mongoose.model('Questions',QuestionsSchema);

module.exports = {Questions};
