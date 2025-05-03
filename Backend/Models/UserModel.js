
const mongoose = require('mongoose');

const userModel = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
    }
    
})

module.exports= mongoose.model("UserModel",userModel);