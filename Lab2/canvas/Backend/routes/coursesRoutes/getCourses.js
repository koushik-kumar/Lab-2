var routerr = require('express').Router();
var kafka = require('./../../kafka/client');

routerr.post('/getCourses', function (req, res) {

  console.log('=========================Inside Backend - Get Courses =========================');
  console.log('Request Body: ', req.body);


  kafka.make_request('getCourses', req.body, function(err, result){
    console.log('========================= In the make request - Get Courses =========================');
    console.log('results', result);

    if(err){
      console.log('Error getting courses');
      res.writeHead(400, {
          'Content-type': 'text/plain'
      });
      res.end('Error logging in!');
    } else{ 
      console.log('Inside getting courses result');
      if(result){
        console.log("Getting user courses")
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.end(JSON.stringify(result));
      }

    }

  })

})

module.exports=routerr
