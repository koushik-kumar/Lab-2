var mongoose = require('mongoose');

const AnnouncementsSchema= new mongoose.Schema({
    AnnID : {
        type : String,
        required:true
    },
    Title :{
        type : String,
    },
    Due : {
        type : Date,
        required:true
    },
    Time : {
        type : Date,
        default : Date.now
    },
    Instrutions : {
        type : String,
        required:true
    }
})

var Announcements = mongoose.model('Announcements',AnnouncementsSchema);

module.exports = {Announcements};
