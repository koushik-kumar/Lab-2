var router = require('express').Router();
var kafka = require('./../../kafka/client');

router.post('/getassignment',function(req,res){

  console.log("##########"+JSON.stringify(req.body))
  kafka.make_request('getassignment', req.body, function(err, result){

    console.log("$$$$$$$$$$"+JSON.stringify(result)+"@@@@@@@")
    if(result){
      if(result.length>0){
       console.log("announcement results",result[0].assignments)
       res.end(JSON.stringify(result[0].assignments))
      }
      else{
       res.writeHead(400, {
         'Content-Type': 'text/plain'
     })
     res.end("Error finding mongo results for announcements");
      }
    }
    else{
     res.writeHead(400, {
       'Content-Type': 'text/plain'
   })
   res.end("Error finding mongo results for announcements");
    }
   
     
   })
  

    })
    router.post('/getassignmentdet',function(req,res){

      kafka.make_request('getassignmentdet', req.body, function(err, results){

        if(results){
          if(results.length>0){
            arr = results[0].assignments
            console.log("inarray",arr)
            arr.forEach(function(assignment){
             console.log(assignment)
             if(assignment.assignmentid==req.body.assignmentid){
               res.end(JSON.stringify([assignment]))
             }
            })
            
          
        }
          else{
           res.writeHead(400, {
             'Content-Type': 'text/plain'
         })
         res.end("Error finding mongo results for assignments");
          }
        }
        else{
         res.writeHead(400, {
           'Content-Type': 'text/plain'
       })
       res.end("Error finding mongo results for assignments");
        }
       })


    })
    module.exports=router