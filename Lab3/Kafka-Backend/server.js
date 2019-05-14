var connection = require('./kafka/Connection');


var Login = require('./services/login')
var Register = require('./services/register');
var Register = require('./services/register');
// var CreateCourse = require('./services/createCourse');
// var EnrollCourse = require('./services/enrollCourse');
// var EnrollWaitlistCourses = require('./services/enrollWaitlistCourses');
var GetCourses = require('./services/getCourses');
var UpdateProfile = require('./services/updateProfile');
var GetProfileData = require('./services/getProfileData')
var GetAssignment = require('./services/getAssignment')
var GetAssignmentDet = require('./services/getAssDetails')
// var PermissionNumber = require('./services/permissionNumber')

function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log('data : ',data);
            });
            return;
        });
        
    });
}

handleTopicRequest("login", Login);
handleTopicRequest("register", Register);
// handleTopicRequest("createCourse", CreateCourse);
// handleTopicRequest("enrollCourse", EnrollCourse);
// handleTopicRequest("enrollWaitlistCourses", EnrollWaitlistCourses);
handleTopicRequest("getCourses", GetCourses);
handleTopicRequest("updateProfile", UpdateProfile);
handleTopicRequest("getProfileData", GetProfileData);
handleTopicRequest("getassignment", GetAssignment);
handleTopicRequest("getassignmentdet", GetAssignmentDet);
// handleTopicRequest("permissionNumber", PermissionNumber);
