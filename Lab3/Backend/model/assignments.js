var mongoose = require('mongoose');

const AssignmentsSchema = new mongoose.Schema({
    AssgID : {
        type : String,
        required:true
    },
    Title :{
        type : String,
        unique : true
    },
    Due : {
        type : Date,
        required:true
    },
    Points : {
        type : Number,
        default : 0
        // required:true
    },
    Instrutions : {
        type : String,
        required:true
    }
})

var Assignments = mongoose.model('Assignments',AssignmentsSchema);

module.exports = {Assignments};
