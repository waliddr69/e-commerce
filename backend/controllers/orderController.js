const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel")
const Cart = require("../models/cartModel")

const addOrder = asyncHandler(async(req,res)=>{
    const {cartId,fname,lname,email,street,city,state,country,zipcode,phone,method,price,products} = req.body;
    
    const userId = req.user.userId;
    const items = products.reduce((sum,q)=>sum+q.quantity,0)
    console.log(fname,lname,email,street,city,state,country,zipcode,phone,method,price,products,userId)
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
    console.log(cartId)
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
    const orders = await Order.find().populate("products.productId")
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