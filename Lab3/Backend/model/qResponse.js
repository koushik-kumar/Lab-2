var mongoose = require('mongoose');

const QResponseSchema= new mongoose.Schema({
    QID : {
        type : String,
        required:true
    },
    Response :{
        type : String,
        // required:true
    },
    Points : {
        type : Number
    }
})

var QResponse = mongoose.model('QResponse',QResponseSchema);

module.exports = {QResponse};
