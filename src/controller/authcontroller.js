const User=require("../model/userModel");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const generateToken = (user) => {
    return jwt.sign({user}, process.env.SECRET_KEY)
}

const Register=async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email});
        if (user){
           return res.status(400).send("email is already exists ")
        } 
        user=await User.create(req.body);
        const token = generateToken(user);
        return res.status(200).send({user, token});

    } catch (error) {
       return  res.status(400).send({message:error.message})
    }
}

const login = async (req, res) => {
    try{
        
        const user = await User.findOne({email : req.body.email})
        //checked if mail exists in db
        if(!user){
            return res.status(400).send("Wrong Email or Password")
        }
        //if email exists, check password is same as register User;
        const match = user.checkPassword(req.body.password)

        // if it doesn't match throw an error
        if(!match){
            return res.status(400).send({message : "Wrong Email or Password"})
        }
        // if it matches generateToken
        const token = generateToken(user)
        return res.status(200).send({user, token});
    }
    catch(err){
       return res.status(400).send({message : err.message})
    }
}

module.exports = {Register,login}





