
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel")
const {verifySignature } = require("@chargily/chargily-pay")
const Cart = require("../models/cartModel")
const webhook = asyncHandler(async(req,res)=>{
    
    const signature = req.get("signature");
    const body = req.rawBody
  
    const secret = process.env.CHARGILY_KEY;
    const event = req.body;

    if(verifySignature(body,signature,secret)){
        if(event.type === "checkout.paid"){
        const order = await Order.create({
            userId:event.data.metadata.userId,
            products:JSON.parse(event.data.metadata.products),
            fname:event.data.metadata.fname,
            lname:event.data.metadata.lname,
            email:event.data.metadata.email,
            street:event.data.metadata.street,
            city:event.data.metadata.city,
            state:event.data.metadata.state,
            country:event.data.metadata.country,
            zipcode:event.data.metadata.zipcode,
            phone:event.data.metadata.phone,
            method:"chargily",
            price:event.data.amount,

        })

         await Cart.updateOne({
            userId:event.data.metadata.userId,
            products:JSON.parse(event.data.metadata.products)
        },{$set:{"products.$[].isOrdered":true}},{new:true}) 

        order.save()
        
        res.status(200).json({success:true})}

    }else{
        console.log("failure")
        res.status(400).json({success:false,message:"Invalid signature"})
    }
})

module.exports = {webhook}