//import the require dependencies


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');
// var mysql = require('mysql');
app.set('view engine', 'ejs');

const passport = require('passport');
app.use(passport.initialize());
require('./auth/passport')(passport);



var mongoose = require('./config/mongoDBConfig');
var Users = require('./model/users');
var Courses  = require('./model/courses')
var CourseEnrollments = require('./model/courseEnrollments');
var Announcements = require('./model/announcements');
var Assignments = require('./model/assignments');
var Quiz = require('./model/quiz');
var Questions = require('./model/questions');
var QResponse = require('./model/qResponse');
var permissionNumber = require('./routes/coursesRoutes/permissionNumber')
var login = require('./routes/loggingRoutes/login')
var register = require('./routes/loggingRoutes/register');
var createCourse = require('./routes/coursesRoutes/createCourse');
var enrollCourse = require('./routes/coursesRoutes/enrollCourse');
var enrollWaitlistCourses = require('./routes/coursesRoutes/enrollWaitlistCourses');
var getCourses = require('./routes/coursesRoutes/getCourses');
var updateProfile = require('./routes/loggingRoutes/updateProfile');
var getProfileData = require('./routes/loggingRoutes/getProfileData')
var files = require('./routes/assignments/files')
var seeFolders = require('./routes/assignments/checkFolders')
var assignmentFiles = require('./routes/assignments/asgnmntFiles')
var createAssignment = require('./routes/assignments/createAssignment')
var getAssignment = require('./routes/assignments/getAssignment')



var connection = require('./../Backend/config/mongoDBConfig');
// var login = require('./routes/loggingRoutes/login');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'enterprisedistributed',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/',register);
app.use('/',login);
app.use('/', createCourse);
app.use('/', getCourses);
app.use('/', enrollCourse);
app.use('/', enrollWaitlistCourses );
app.use('/', updateProfile );
app.use('/', getProfileData );
app.use('/', permissionNumber );
app.use('/', files );
app.use('/', seeFolders );
app.use('/', assignmentFiles );
app.use('/', createAssignment );
app.use('/', getAssignment );


    
app.listen(3001);
console.log("Server Listening on port 3001");