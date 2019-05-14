var connection = require('../../config/mysqlDBConfig.js');
var routerr = require('express').Router();
// var { Courses } = require('../../model/courses');
// var { Users } = require('../../model/users');
var {permissionNbr} = require('../../model/permissionNbr')


routerr.post('/genPNbr', (req, res) => {
    console.log("Backend: -------------- Inside permission number");
    console.log("request data is :"+ JSON.stringify(req.body))
    console.log("Codes :"+ (req.body.pnr_codes.length))

    for(let i=0; i<req.body.pnr_codes.length; i++){
        var pnbr  = new permissionNbr({
            "WaitListNumber" : req.body.pnr_codes[i],
            "CourseID" :    req.body.CourseID,
            "TeacherID":    req.body.TeacherID,
            "Validity":     req.body.Validity
        })
        pnbr
            .save()
            .then((pnbr) => {
                console.log("Creating permission code")
            })
    }

    setTimeout(() => {
        console.log("Permission numbers: ----"+(permissionNbr.find({CourseID:req.body.CourseID})))
        permissionNbr.find(
            {CourseID:req.body.CourseID}, 
            {   WaitListNumber:1,
                _id: false
            },
            function(err, prmNbr){
                if(err){
                    console.log(err.message)
                } else if (prmNbr) {
                    console.log("Printing permission numbers")
                    console.log(prmNbr)
                    res.status(200)
                    res.send(prmNbr)
                }
            }
        )
    }, 1000)


})


routerr.post('/getPNumbers', (req, res) => {
    console.log("Backend: -------------- Inside permission number");
    console.log("request data is :"+ JSON.stringify(req.body))

    permissionNbr.find(
        {CourseID:req.body.CourseID,
        TeacherID:req.body.TeacherID},
        function(err, numbers){
            if(err){
                console.log(err.message)
            } else if (numbers) {
                console.log("Printing permission numbers")
                console.log(numbers)
                res.status(200)
                res.send(numbers)
            }
        }

    )

})


module.exports = routerr
