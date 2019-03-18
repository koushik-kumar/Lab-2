var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var _eval = require('eval');
const nodeEval = require('node-eval');
app.set('view engine', 'ejs');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/calculate', function (req, res) {
    // console.log("INSIDE Calculator service:" + JSON.stringify(req.body));
    console.log("Before Evaluation: "+JSON.stringify(req.body.statement));
    try{
        var data = nodeEval((JSON.stringify(req.body.statement)).replace(/(^")|("$)/g, ''));
        console.log("After Evaluation: "+JSON.stringify(data));
        res.status(200);
        res.end(JSON.stringify(data));
    } catch(err){
        res.end(err.message);
        // console.log(err.message);
    }
    
});

app.listen(3001);
console.log("Server Listening on port 3001");