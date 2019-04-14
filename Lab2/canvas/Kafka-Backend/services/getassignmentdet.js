// const Courselist  = require('../models/Courses');

var Model = require('./../DatabaseConnection');

function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    
    Courselist.find({CourseID:msg.CourseID,"assignments.assignmentid":msg.assignmentid}, {_id:0, assignments: 1}, (err, results) => {
        if (results) {
    
                console.log("in user",results)
                callback(null,results)
            }
    
        else{
            console.log("null")
            callback(null,null);
        }
    })

}
exports.handle_request = handle_request;
