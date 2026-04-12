const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel")
const Cart = require("../models/cartModel")
const Profile = require("../models/profileModel")

const addOrder = asyncHandler(async(req,res)=>{
    const {cartId,fname,lname,email,street,city,state,country,zipcode,phone,method,price,products} = req.body;
    
    const userId = req.user.userId;
    const items = products.reduce((sum,q)=>sum+q.quantity,0)
   
    const order = await Order.create({
        userId,
        products,
        fname,
        lname,
        email,
        street,
        city,
        state,
        country,
        zipcode,
        phone,
        method,
        items,
        price
    })
    for(let i=0;i<products.length;i++){
        await Profile.create({
               userId:req.user.userId,
               eventType:"purchase",
               productId:order.products[i].productId
        })
    }
   
    const cart = await Cart.findByIdAndUpdate(
        cartId,
        {$set:{"products.$[].isOrdered":true}},
        {new:true}
    )
    res.json({order,cart})

    

})

const getOrder = asyncHandler(async(req,res)=>{
    
    const userId = req.user.userId;
    const order = await Order.find({userId})
    res.json({order})
})

const getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find().populate("products.productId").populate("userId")
    res.json({orders})
})

const modifyOrder = asyncHandler(async(req,res)=>{
    const {status,id} = req.body;
    if(!status){
        res.json(400)
        return
    }

    const order = await Order.findByIdAndUpdate(
        id,
        {$set: {"status": status}},
        {new: true}
    )

    res.json({order})
})

module.exports = {addOrder,getOrder,getOrders,modifyOrder}