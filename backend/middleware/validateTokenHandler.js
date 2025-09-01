const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const validateToken = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.token

    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({success:false,message:"user is not authorized"})
                
            }
            else{
                req.user = decoded
            }
        })
    }else{
        return res.status(401).json("token is missing")
        
    }
    next()

})

module.exports = validateToken