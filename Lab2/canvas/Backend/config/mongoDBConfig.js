var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const uri = "mongodb+srv://Admin:Admin@cluster0273-5jsyb.mongodb.net/canvasDB?retryWrites=true";
const client = uri+"{ useNewUrlParser: true, useCreateIndex: true }";

var mdbconn=mongoose.connection;

mongoose.connect(client);

mdbconn.on('error',console.error.bind(console,'Connection error'))
mdbconn.on('open',()=>{
    console.log('Mongo DB is connected!')
})

module.exports = {mongoose};