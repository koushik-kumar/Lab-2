var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Role: {
        type: String
    },
    UserID: {
        type: Number,
        required: true,
        unique: true
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Avatar: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    ProfilePicID: {
        type: String
    },
    PhoneNo: {
        type: Number,
        unique: true
    },
    AboutMe: {
        type: String
    },
    City: {
        type: String
    },
    Country: {
        type: String
    },
    Company: {
        type: String
    },
    School: {
        type: String
    },
    HomeTown: {
        type: String
    },
    Languages: {
        type: String
    },
    Gender: {
        type: String
    },
    Links: {
        type: String
    },
    Created: {
        type: Date,
        default :   Date.now
    },
    // courses: {
    //     type: Array
    // },
    coursesEnrolled: {
        type: Array
    },
    coursesWaitingList:{
        type: Array
    },
    Links: {
        type: String
    }
});

// UserSchema.pre('save', async function(next){
//     const registerUser = this;

//     //Hashing the password with salt rounds of 10
//     const hashed = await bcrypt.hash(registerUser.password, 10);
//     registerUser.password = hashed;
//     next();
//   });

//   UserSchema.methods.isValidPassword = async function(loginPassword){
//     const user = this;
//     const compare = await bcrypt.compare(loginPassword, user.password);
//     return compare;
//   }



var Users = mongoose.model("User", UserSchema);

module.exports = { Users };
