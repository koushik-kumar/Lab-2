var connection = require('./kafka/Connection');


var Login = require('./services/loggingRoutes/login')
var Register = require('./services/loggingRoutes/register');
var CreateCourse = require('./services/coursesRoutes/createCourse');
var EnrollCourse = require('./services/coursesRoutes/enrollCourse');
var EnrollWaitlistCourses = require('./services/coursesRoutes/enrollWaitlistCourses');
var GetCourses = require('./services/coursesRoutes/getCourses');
var UpdateProfile = require('./services/loggingRoutes/updateProfile');
var GetProfileData = require('./services/loggingRoutes/getProfileData')
var PermissionNumber = require('./services/coursesRoutes/permissionNumber')

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
handleTopicRequest("createCourse", CreateCourse);
handleTopicRequest("enrollCourse", EnrollCourse);
handleTopicRequest("enrollWaitlistCourses", EnrollWaitlistCourses);
handleTopicRequest("getCourses", GetCourses);
handleTopicRequest("updateProfile", UpdateProfile);
handleTopicRequest("getProfileData", GetProfileData);
handleTopicRequest("permissionNumber", PermissionNumber);
