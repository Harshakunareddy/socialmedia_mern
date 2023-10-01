import User from "../models/User.js";
import jwt from "jsonwebtoken";
// const {jwt} = jsonwebtoken;
import bcrypt from "bcrypt";

// register for new user
const register = async (req,res) => {
    try{
        // destructuring the credentials from the req.body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // generating the salt using bcrypt
        // for giving different hash for the identical passwords
        // and also provide the security layer for the passwords

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);


        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 500),
            impressions: Math.floor(Math.random() * 500)

        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({error:err.message});
    }
}


// login code
const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "no user found with this username"});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        const token = jwt.sign({id:user._id}, "BariloAthiBariString");
        // don't know
        delete user.password;
        res.status(200).json({token,user});
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}
export default {register,login};







