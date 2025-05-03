const express= require('express');
const router = express.Router();
const verifyToken = require('../Middleware/verifyToken');
const verifyRole = require('../Middleware/verifyRole');
const{addFavouriteCountry,getFavouriteCountry,removeFavouriteCountry} = require('../Controllers/FavouriteCountryController')


router.post('/add-favourite-country',verifyToken,verifyRole("user"),addFavouriteCountry);
router.get('/get-favourite-country',verifyToken,verifyRole("user"),getFavouriteCountry);
router.delete('/delete-fav-country',verifyToken,verifyRole("user"),removeFavouriteCountry);

module.exports=router;