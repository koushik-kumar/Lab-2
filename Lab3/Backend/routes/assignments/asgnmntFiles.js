var multer = require('multer');
var fs = require('fs');

const path = require('path');
var router = require('express').Router();



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './submissions/'+req.query.CourseID+'/'+req.query.UserID+'/'+req.query.assID+'/')
    },
    filename: function (req, file, cb) {
    cb(null, '200' + '-' +file.originalname )
    }
    })
    
    var upload = multer({ storage: storage }).single('file')
  router.post('/upload',function(req, res) {
      upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
      } else if (err) {
        return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
      })
  });
    module.exports=router