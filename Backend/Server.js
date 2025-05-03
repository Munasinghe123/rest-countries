const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//routes
const userRoutes = require('./Routes/UserRoutes');
app.use('/api/users/',userRoutes);

const countryRoutes = require('./Routes/FavouriteCountryRoutes');
app.use('/api/country/',countryRoutes);

const PORT = process.env.PORT || 5001;
const MONGODBURL = process.env.MONGODBURL; 


mongoose.connect(MONGODBURL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT}`);
})



