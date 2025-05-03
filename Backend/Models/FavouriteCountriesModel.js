const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const FavouriteCountriesSchema= new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    userName:{
        type:String,
        ref:"UserModel"
    },
    countryName:{
        type:String
    },
    countryCode:{
        type:String
    }
})

module.exports = mongoose.model("favouriteCountriesModel",FavouriteCountriesSchema);