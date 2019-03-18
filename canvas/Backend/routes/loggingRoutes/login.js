var connection = require('./../../config/dbConfig.js');
var json = require('json');
const bcrypt = require('bcrypt');

// var localStorage = require('localStorage');

module.exports.login=function(req,res){
    var userIDcookie;
    console.log("INSIDE BACKEND LOGIN"+JSON.stringify(req.body));


    var sql = "SELECT * FROM Users WHERE UserID = "+req.body.UserID;
    connection.query(sql, function(err,results,fields){
        if (err) {
            console.log("Firsddddddddddddddddddddddddddddddddddddddddddddddddddt error.....");
            res.status(400);
            res.json({
            status:false,
            message:'there are some error with query'
            })
        }else {
            if(results.length >0){
                results.filter(function(user){
                    console.log("SECONDDDDDDDddddddddddDDDDDDDD error.....");
                    bcrypt
                    .compare(req.body.password, user.Password)
                    .then(resl => {
                        
                        if(resl){
                            console.log("checking the result - "+resl);
                            res.cookie('userID', user.UserID, { maxAge: 900000, httpOnly: false, path: '/' });
                            req.session.userID = user.UserID;
                            console.log("EQUAL ------"+user.UserID);
                            res.status(200);
                            res.send("Successful Login");
                        } 
                        else{
                            console.log("Invalid password"+user.UserID);
                            res.status(400);
                            res.send("Invalid password or userID");
                        }
                        
                    })
                    .catch(err =>{
                        console.error("ERROR:"+err.message);
                    } );
                })
            }else {
                // console.log("Thirddddddddddddddddddddddddddddddddddddddddddd error.....");
                console.error("User ID does not exits! Signup.");
                // res.json({
                //     status:false,    
                // message:"User ID does not exits! Signup."
                // });
                res.status(400);
            res.send("User ID does not exits! Signup.");
        }
    //   console.log(results);
        }
    });


}