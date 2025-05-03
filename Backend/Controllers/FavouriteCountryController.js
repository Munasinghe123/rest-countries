
const userModel = require('../Models/UserModel');
const favouriteCountryModel = require('../Models/FavouriteCountriesModel');

const addFavouriteCountry = async(req,res)=>{

    try{
        const{countryName,countryCode}=req.body
        const userId= req.user.id

        const userName=req.user.name;

        const exixtingCountry = await favouriteCountryModel.findOne({countryCode,countryName,userId});
        if(exixtingCountry){
            return res.status(400).json({message:"Country already eixits"})
        }

        const newFavourite = new favouriteCountryModel({userId,userName,countryName,countryCode});

        if(!newFavourite){
            res.status(401).json({message:"Unalbe to add favourite country"});
        }

        await newFavourite.save();
        console.log("fav country saved");

        res.status(200).json({message:"New favourite country saved",newFavourite});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",err});
    } 

}

const getFavouriteCountry = async(req,res)=>{

    try{

        const favouriteCountries = await favouriteCountryModel.find({userId:req.user.id});
        if(!favouriteCountries){
            res.status(404).json({message:"No faourite countries for this user"});
        }

        res.status(200).json({message:"Favourite countries",favouriteCountries});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",err});
    }

}

const removeFavouriteCountry = async (req,res)=>{

    try{
        const{countryCode} = req.body;

        console.log("check 1");

        const userId = req.user.id;
        
        console.log("check 2");

        const country = await favouriteCountryModel.findOneAndDelete({countryCode,userId}) 
        if(!country){
            res.status(404).json({message:"Unable to delete the country"});
        }

        console.log("check 3");
        console.log("Country removed from favourites");
        res.status(200).json({message:"Country removed from favourites successfully",country});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",err});
    }

}

module.exports = {addFavouriteCountry,getFavouriteCountry,removeFavouriteCountry}