var multer = require('multer');
var fs = require('fs');
var con = require('../db/sql')

const path = require('path');
var router = require('express').Router();
var con = require('../db/sql')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './submissions/'+req.query.courseid+'/'+req.query.studentid+'/'+req.query.assignmentid+'/')
    },
    filename: function (req, file, cb) {
      console.log("hi",req.body,file)
    cb(null, '200' + '-' +file.originalname )
    }
    })
    
    var upload = multer({ storage: storage }).single('file')
  router.post('/upload',function(req, res) {
        console.log(req.body)
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