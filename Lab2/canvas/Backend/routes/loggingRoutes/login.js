// var connection = require('../../config/mysqlDBConfig.js');
const passport = require('passport');
const gravatar = require('gravatar');

const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var {Users} = require('./../../model/users');
var routerr = require('express').Router();
var json = require('json');
var config = require('./../../config/settings')

var kafka = require('../kafka/client');
var requireAuth = passport.authenticate('jwt', {session: false});



routerr.post('/login', function (req, res) {

    console.log("BACKEND: ------- INSDIE LOGIN POST");
    console.log('Request Body: ', req.body);


    

});

module.exports=routerr
