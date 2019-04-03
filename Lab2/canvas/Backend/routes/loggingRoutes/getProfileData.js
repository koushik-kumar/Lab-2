var connection = require("../../config/mysqlDBConfig.js");
var json = require("json")

module.exports.getProfileData = function (req, res) {
    console.log(JSON.stringify(req.body));
    id = JSON.stringify(req.body.UserID);
    console.log("getting profile data of "+id);
    var getProfileDataQuery = "SELECT FirstName,LastName,PhoneNo,AboutMe,links FROM Users where UserID=" + id;
    // console.log("SQL Query: "+getProfileDataQuery)
    connection.query(getProfileDataQuery, function (err, results, field) {
        if (err) {
            res.json({
                status: false,
                message: "there are some error with query"
            });
        } else {
            if (results) {
                console.log(results);
                res.status(200);
                res.send(results);
            } else {
                res.json({
                    status: false,
                    message: "User doesn't exist."
                });
                res.status(400);
                res.end("User doesn't exist.");
            }
        }
    })
}