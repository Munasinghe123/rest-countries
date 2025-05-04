const userModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login  = async (req,res)=>{

    try{
        const{name,password} = req.body;
       
        const user = await userModel.findOne({name});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isCompare = await bcrypt.compare(password,user.password);
        if(!isCompare){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign({id:user._id,role:user.role, name:user.name,photo:user.photo, email:user.email},process.env.JWT_SECRET,{expiresIn:"1d"});
        console.log(token); //debugging

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(200).json({token});
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }  
}

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
    console.log("Logged out successfully");
    res.status(200).json({ message: 'Logged out successfully' });
}

const checkToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await userModel.findOne({ name, email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const photo = req.file ? req.file.path : null;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        photo,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: `User registered successfully: ${name}` });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  

module.exports = {login,register,logout,checkToken}