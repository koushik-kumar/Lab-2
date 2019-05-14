var multer = require('multer');
var fs = require('fs');

const path = require('path');
var router = require('express').Router();
router.post('/createFolder',function(req, res) {
    var drc = req.body.foldname;
    
    if (!fs.existsSync(drc)){
        fs.mkdirSync(drc);
    }
    res.send(200).end();
    });
    var store = multer.diskStorage({
        destination: function (req, file, cb) {+96+
        cb(null, './files/'+req.query.CourseID+'/'+req.query.foldname)
        },
        filename: function (req, file, cb) {
        cb(null, '200' + '-' +file.originalname )
        }
        })
        
        var upl = multer({ storage: store }).single('file')
  router.post('/uploadFile',function(req, res) {
      upl(req, res, function (err) {
      if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
      } else if (err) {
      return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
      })
  });
        module.exports=router