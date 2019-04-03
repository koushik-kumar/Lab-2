var connection = require('../../config/mysqlDBConfig.js');
var json = require('json');

module.exports.updateProfile = function(req,res){

  id = JSON.stringify(req.body.UserID);
  console.log("Inside profile update module");
  // console.log("111111: "+req.body.contact+" 2222: "+req.body.biography+" 3333: "+req.body.links);
  var updateProfileInfo = "UPDATE `Users` SET `PhoneNo`=?,`AboutMe`=?,`links`=? WHERE `UserID`=?"
  
  
  // console.log("Query: "+updateProfileInfo)
  // connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields)
  connection.query(updateProfileInfo,[req.body.contact,req.body.biography,req.body.links,req.body.UserID],function(err, result, fields){
    if(err) {
      console.log(err.message);
      res.status(400);
      res.send(err.message);
      // res.json({
      //   status:false,
      //   message:'there are some errors with the query'
      // });
    }else  {
      if(result.affectedRows==1) {
        res.status(200);
        console.log("Profile updated successfully");
        res.send("Profile updated successfully")
        // res.json({
        //   status:true,
        //   message:'Profile updated successfully'
        // });
      } else {
        res.status(400);
        console.log("Profile not updated");
        res.send("Profile not updated")
        // res.json({
        //   status:false,
        //   message:'Profile not updated'
        // });
      }

    }

  });
};