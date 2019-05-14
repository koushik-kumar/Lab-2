var mongoose = require("mongoose");

const permNbrSchema = new mongoose.Schema({
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

var permissionNbr = mongoose.model("permissionNbr", permNbrSchema);

module.exports = { permissionNbr };
