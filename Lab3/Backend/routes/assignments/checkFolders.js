
var multer = require('multer');

const path = require('path');
var router = require('express').Router();
var fls = require('fs');
router.get('/checkFolders',function(req,res){
    const Filehound = require('filehound');

    Filehound.create()
      .path("./files/"+req.query.CourseID)
      .directory()
      .find((err, subdirectories) => {
        if (err) return console.error(err);
        res.send(subdirectories)
      });
})

router.get('/seeFoldFiles',function(req,res){
    console.log(req.query)
     console.log("inside see files")
    fls.readdir( req.query.path, function(err, items) {
        res.end(JSON.stringify(items));
    });
    
    
  
             
  })
  router.get('/checkFiles',function(req,res){
console.log(req.query)
if(req.query.Role=="student"){
      fls.readdir( "./submissions/"+req.query.CourseID+'/'+req.query.UserID+'/'+req.query.assID+'/', function(err, items) {
       console.log(items)
          res.end(JSON.stringify(items));
      });
    }
    else{
      const Filehound = require('filehound');
      console.log("body",req.query)
  
      Filehound.create()
        .path("./submissions/"+req.query.CourseID+'/')
        .directory()
        .find((err, subdirectories) => {
          if (err) return console.error(err);
      
          console.log(subdirectories);
          res.send(subdirectories)
        });
    }
      
  
               
  })
  router.post('/dwnldfile-file/:file(*)', function(req, res){
    var file = req.params.file;
    var fileloc = path.join(__dirname ,'..'+ req.body.pathfile, file);
    var img = fls.readFileSync(fileloc);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content-type': 'application/pdf'
    });
    res.end(JSON.stringify(base64img));
  
  });
  router.post('/dwnload-File/:file(*)', function(req, res){
      var file = req.params.file;
      var fileloc = path.join(__dirname,'..' + '/submissions/'+req.body.data.CourseID+'/'+req.body.data.UserID+'/'+req.body.data.assID+'/', file);
      var img = fls.readFileSync(fileloc);
      var base64img = new Buffer(img).toString('base64');
      res.writeHead(200, {
          'Content-type': 'application/pdf'
      });
      res.end(JSON.stringify(base64img));
  
  });
module.exports=router
