const asyncHandler = require("express-async-handler")

const joi = require("joi")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async(req,res)=>{
    let {name,email,pass,role} = req.body
    
    if(!role&&(name.trim() ===""||email.trim()===""||pass.trim()==="")){
        res.status(400).json({success:false,message:"All fields are mandatory"})
        
    }

    if(!role&&(!/\s/.test(name))){
        res.status(400).json({success:false,message:"Name should contain first name and last name"})
        
    }
    if(!role){
        name = name.trim().replace(/\s+/g," ")
    }

    

     const schema = joi.object().keys({
        email:joi.string().trim().email().required(),
        pass:joi.string().min(5).max(12).required()
    });

    const {error} = schema.validate({email,pass})

    if(error){
        res.status(400).json({success:false,message:error.details[0].message})
        
    }
    const findEmail = await User.findOne({email:email})
    if(findEmail){
        res.status(400).json({success:false,message:"Email already registered"})
        
    }
    const hashedPass = await bcrypt.hash(pass,10)

    const avatar = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`
    let user = null;
    if(!role){
     user = await User.create({
        username:name.trim(),
        email,
        password:hashedPass,
        avatar

    })}else if(role==="admin"){
        user = await User.create({
        
        email,
        password:hashedPass,
        role,
        avatar

    })
    }

    res.status(201).json({success:true,message:"user registered successfully, Redirecting..."})

})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,pass,role} = req.body
    console.log(email,pass,role)
    if(email.trim() ===""||pass.trim()===""){
        res.status(400).json({success:false,message:"All fields are mandatory"})

    }

    const user = await User.findOne({email,role})
    if(!user){
        res.status(400).json({success:false,message:"User does not exist"})

    }
    const match = await bcrypt.compare(pass,user.password)
    if(!match){
        res.status(400).json({success:false,message:"Invalid password"})
        
    }

    const token = jwt.sign({
        userId : user._id,
        email: user.email,
        role:user.role
    },process.env.JWT_SECRET,{expiresIn:"7d"}) 
    res.cookie("token",token,{
        httpOnly:true,
        
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })
    res.status(200).json({success:true,message:"user logged in successfully, Redirecting...",name:user.username,avatar:user.avatar,token})

})

const getUser = asyncHandler(async(req,res)=>{
    const id = req.user.userId

    const user = await User.findById(id)
    if(!user){
        res.status(404).json({success:false,message:"User not found"})
        
    }
    res.json({success:true,name:user.username,avatar:user.avatar})
})

const handleLogout = asyncHandler(async(req,res)=>{
    const userId = req.user.userId;
    if(userId){
        res.clearCookie("token",{
        sameSite:"strict",
        secure:true,
        httpOnly:true
    });
    res.json({success:true})
    }
    

    
})

module.exports = {registerUser,loginUser,getUser,handleLogout}