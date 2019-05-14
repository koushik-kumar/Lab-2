var Model = require('../DatabaseConnection');

function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');


    console.log('Message', msg);
    
    Courselist.find({CourseID:msg.CourseID,"assignments.assID":msg.assID}, {_id:0, assignments: 1}, (err, results) => {
        if (results) {
    
                console.log("User:",results)
                callback(null,results)
            }
    
        else{
            console.log("null")
            callback(null,null);
        }
    })

}
exports.handle_request = handle_request;
