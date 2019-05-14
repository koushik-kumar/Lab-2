const graphql = require('graphql');
const _ = require('lodash');
var Student = require('../model/users')
var Faculty = require('../model/users')

var StudentLogin = require('../model/users')
var Courselist = require('../model/courses')
var bcrypt = require('bcryptjs');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;


const MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: () => ({
        
        studentname: {
            type: GraphQLString
        },
        message:{
            type: GraphQLString
        }

    })
});

const StudentMesType = new GraphQLObjectType({
    name: 'StudentMesType',
    fields: () => ({
        
        studentid: {
            type: GraphQLString
        },
        messagecontent:{
            type: MessageType
        }

    })
});



const GradesType = new GraphQLObjectType({
    name: 'GradesType',
    fields: () => ({
        
        courseid: {
            type: GraphQLString
        },
        assignmentid: {
            type: GraphQLString
        },
        score: {
            type: GraphQLString
        }

    })
});


const StudCoursesType = new GraphQLObjectType({
    name: 'StudCoursesType',
    fields: () => ({
        
        courseid: {
            type: GraphQLString
        },
        coursename:{
            type: GraphQLString
        },

        coursecol: {
            type: GraphQLString
        },
        coursestatus:{
            type: GraphQLString
        }
        
    })
});





const StudType = new GraphQLObjectType({
    name: 'StudType',
    fields: () => ({
        
        studentid: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        Password: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        about: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        hometown: {
            type: GraphQLString
        },
        school: {
            type: GraphQLString
        },
        company: {
            type: GraphQLString
        },
        language: {
            type: GraphQLString
        },
        phonenumber: {
            type: GraphQLString
        },
        Accounttype: {
            type: GraphQLString
        },
        messages:{
            type:StudentMesType
        },
        studentcourses:{
            type:StudCoursesType
        },
        grades:{
            type:GradesType
        }
    })
});




const UsersType = new GraphQLObjectType({
    name: 'UsersType',
    fields: () => ({
        data:{
            type:StudType
        },
        status:{
            type:GraphQLInt
        }
    })
})


const CoursesType = new GraphQLObjectType({
    name: 'CoursesType',
    fields: () => ({
        course_result:{
            type: new GraphQLList(StudCoursesType)
        },
        status:{
            type:GraphQLInt

        }
    })
})
const Profile_details_Type = new GraphQLObjectType({
    name: 'Profile_details_Type',
    fields: () => ({
        result:{
            type: new GraphQLList(StudType)
        },
        status:{
            type:GraphQLInt

        }
    })
})

var loginVar
var Coursresult
var Profileresult
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        User: {
            type: UsersType,
            args: {
                studentid: { type: GraphQLString },
                password: { type: GraphQLString },
                stufac:{ type: GraphQLString }
            },
             resolve(parent, args) {
                return new Promise((resolve, reject) => {
                    if(args.stufac=="student"){
                  Student.findOne({
                    studentid: args.studentid
                },  function (err, result) {
                    if (err) {
                        console.log("eroror ")
                        loginVar = err
                    } else if (result) {
                        console.log(result)
                        if (bcrypt.compareSync(args.password, result.password)) {
                           console.log("res",result)
                            loginVar = {
                                data:result,
                                status:200,
                                
                            };
                            // status = true
                            // console.log("results sks",loginVar)
                            // result.status=200
                        }
                        else {
                            console.log("in error 1")
                            loginVar={
                                status:400
                            }
                            // loginVar = "Invalid Login"
                            // status  = false
                            // result.status=200
                        }

                    }
                    else{
                    
                        
                        loginVar={
                            status:401
                        }
                    }
                
                    
                    resolve(loginVar);
                })
            }
            else{
                Faculty.findOne({
                    facultyid: args.studentid
                },  function (err, result) {
                    if (err) {
                        console.log("eroror ")
                        loginVar = err
                    } else if (result) {
                        console.log(result)
                        if (bcrypt.compareSync(args.password, result.password)) {
                           console.log("res",result)
                            loginVar = {
                                data:result,
                                status:200,
                                
                            };
                            // status = true
                            // console.log("results sks",loginVar)
                            // result.status=200
                        }
                        else {
                            console.log("in error 1")
                            loginVar={
                                status:400
                            }
                            // loginVar = "Invalid Login"
                            // status  = false
                            // result.status=200
                        }

                    }
                    else{
                    
                        
                        loginVar={
                            status:401
                        }
                    }
                
                    
                    resolve(loginVar);
                })
            }
                })
            } 
    },  
    
    getCourses: {
        type: CoursesType,
        args: {
            studentid: { type: GraphQLString },
            stuname: { type: GraphQLString },
            stufac: { type: GraphQLString }
        },
         resolve(parent, args) {
            return new Promise((resolve, reject) => {
                if(args.stufac==="faculty"){
                    // console.log("in get courses",req.body.id);
                    var facultyid = args.studentid
                    Courselist.find({
                      facultyid
                  }, async (err, results) => {
                  
                    if (results) {
            
                        console.log("in user",results)
                        Coursresult = results
                    }

                  })
                }
                else{
                     StudentLogin.find({studentid:args.studentid}, {_id:0, studentcourses: 1}, (err, results) => {
                        if (results) {
                            Coursresult = results
                            console.log("in user",results)
                            
                        }
                })
            }
            if(Coursresult){
                if(Coursresult.length>0){
                    if(args.stufac==="faculty"){
                        console.log("Successfully retrieved Courses");
                        
                        console.log(Coursresult)
                        var data ={
                            course_result:Coursresult,
                            status:200
                        }
                        resolve(data)
                       
                    }
                    else{
                       var course_res = []
                        var counter = 0
                        arr = Coursresult[0].studentcourses
                        console.log("arr",arr)
                        arr.forEach(async function(course){
                            console.log("course",course)
                           await  Courselist .findOne({courseid:course.courseid}, async (err, results) => {
                                
                                if(err){
                                    console.log("courseid error")
                                }
                                else{
                                    if(results!=null){
                                    console.log("courseresult",results)
                                     course_res.push({"courseid":course.courseid,"coursestatus":course.coursestatus,"coursename":results.coursename,"coursecol":results.coursecol})
                                    console.log("incourse",course_res)
                                
                                }
                            }
                                if(counter == arr.length - 1) {
                                    var data ={
                                        course_result:course_res,
                                        status:200
                                    }
                                    console.log("data",data)
                                     resolve(data)
                                 
                                }
                                counter++;
                            })
                    
                    
                        })
                    }
         
                   }
                else{
                 console.log("no courses found")
                }
              }
              else{
                  console.log("unable to find courses")
              }


            })
         }
    },
    getProfile: {
        type: Profile_details_Type,
        args: {
            loginid: { type: GraphQLString },
            stufac:{ type: GraphQLString }
        },
         resolve(parent, args) {
            return new Promise((resolve, reject) => {
                if(args.stufac=="faculty"){
                    Faculty.find({facultyid:args.loginid}, (err, results) => {
                        if (results) {
                
                            console.log("in user",results)
                            Profileresult = {
                                result:results,
                                status:200
                            }
                            resolve(Profileresult)
                        }
                
                    else{
                        console.log("null")
                       
                    }
                      })
        }
        else{
            
 Student.find({studentid:args.loginid}, (err, results) => {
    if (results) {
    
        console.log("in user",results)
        Profileresult = {
            result:results,
            status:200

        }
        resolve(Profileresult)

    }

else{
    console.log("null")
 
}

      })
        }
            })
        } 
},  

}
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        UserRegister: {
            type: UsersType,
            args: {
                studentid : { type: GraphQLString },
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                stufac:{ type: GraphQLString }
            },
            resolve(parent, args){
            const saltRounds = 10;

                if(args.stufac=="student"){
                bcrypt.hash(args.password, saltRounds, function (err,   hash){

                    //   var { mongoose } = require('./db/demo');
                    
                    
                   
                    
                     var userSchema = new Student({
                        studentid:args.studentid,
                        username:args.username,
                        password:hash,
                        name:"",
                        email:"",
                        phonenumber:"",
                        about:"",
                        city:"",
                        country:"",
                        company:"",
                        school:"",
                        hometown:"",
                        languages:"",
                        gender:"",
                        studentcourses:[],
                        grades:[]
                     });
                     Student.findOne({
                        studentid: args.loginid
                    }, function (err, user) {
                        if (user) {
                            console.log("userid already exists")
                         
                        }
                        else{
                            console.log("in error")
                            userSchema.save().then(result =>{
                                console.log(result);
                                return result
                              })
                              .catch(err =>console.log(err));
                        }
                    })

                })
            }
            else{

            }
                // let author ={
                //     name: args.name,
                //     age: args.age,
                //     id: args.id
                // };
                // authors.push(author)
                // console.log("Authors",authors);
                // return author;
            }
        },
        CourseAdd: {
            type: UsersType,
            args: {
                coursename: { type: GraphQLString },
                courseid: { type: GraphQLString },
                coursedes: { type: GraphQLString },
                coursedept: { type: GraphQLString },
                courseterm: { type: GraphQLString },
                coursecol: { type: GraphQLString },
                coursecap: { type: GraphQLString },
                coursewaitcap: { type: GraphQLString },
                courseroom: { type: GraphQLString },
                facultyid: { type: GraphQLString }



            
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                
 var courseSchema = new Courselist({
 
    facultyid:args.facultyid,
      courseid:args.courseid,
      coursename: args.coursename,
      coursedept: args.coursedept,
      coursedes: args.coursedes,
      courseroom: args.courseroom,
      coursecapacity:args.coursecap,
      courseterm: args.courseterm,
      waitlistcapacity: args.coursewaitcap,
      coursecol: args.coursecol,
      announcements:[],
      assignments:[],
      quiz:[]
 });
//  courseSchema.save().then(result =>{
//     console.log(result);
//   })
//   .catch(err =>console.log(err));

Courselist.findOne({
   courseid: args.courseid
}, function (err, course) {
   if (course) {
       console.log("courseid already exists")
       data={
       status : 400
       }
       resolve(data)
   }
   else{
       console.log("in error")
       courseSchema.save().then(result =>{
           console.log(result);
           data = {
           status :200
           }
           resolve(data)
         })
         .catch(err =>console.log(err));
   }
})

            })
            }

            
        }


        

    }
})











module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});