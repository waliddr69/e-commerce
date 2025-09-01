const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");


const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({userId: req.user.userId})
    const products = await Cart.findOne({userId: req.user.userId}).populate("products.productId")
    if(!cart){
        res.status(404).json({message: "Cart not found"})
    }
    const ordereditems = products.products.filter(product=>product.isOrdered!==true)
    const itemCount = ordereditems.reduce((sum,q)=> sum+q.quantity,0);
    const subtotal = ordereditems.reduce((total,q)=>total+q.quantity*q.productId.price,0)
    res.status(200).json({success:true, products: products.products, count: itemCount,cart,cartId:cart._id,subtotal:subtotal})

})

const addCart = asyncHandler(async(req,res)=>{
    const {productId,size} = req.body
    if(!productId || !size || !req.user.userId){
        res.status(400).json({success:false})
    }

    let cart = await Cart.findOne({userId:req.user.userId})
    if(!cart){
        const cart = await Cart.create({
            userId:req.user.userId,
            products:[{productId,size,quantity:1}]})
            res.json({success:true,cart})
    }else{
        const productIndex = cart.products.findIndex(p=>p.productId.toString()===productId && p.size === size)
        if(productIndex > -1){
            cart.products[productIndex].quantity += 1
        }else{
            cart.products.push({productId,size,quantity:1})
        }
        await cart.save()
        res.status(200).json({success:true,cart})
        
    }
        
   
})

const modifyQuantity = asyncHandler(async(req,res)=>{
    const {productId,size,quantity} = req.body
    if(!productId || !size || !req.user.userId || !quantity){
        res.status(400).json({success:false,message:"All fields are mandatory"})
    }

    let cart = await Cart.findOne({userId:req.user.userId})
    if(!cart){
        res.status(404).json({success:false,message:"Cart not found"})
    }else{
         
        const productIndex = cart.products.findIndex(p=>p.productId.toString() === productId && p.size === size)
        if(productIndex > -1){
            cart.products[productIndex].quantity = quantity
            await cart.save()
            res.status(200).json({success:true,cart})
        }else{
            res.status(404).json({success:false,message:"not found"})
        }
        
}})

const removeCart = asyncHandler(async(req,res)=>{
    

    if(req.query.id && req.query.cartId){
        let find = await Cart.findById(req.query.cartId)
        if(find){
            const productIndex = find.products.findIndex(p=>p.productId.toString() === req.query.id)
            if(productIndex>-1){
                find.products = find.products.filter((_,index)=> index!==productIndex)
                await find.save()
                res.status(200).json({success:true,find})
            }
        
        }else{
            res.status(404).json({success:false,cartId:req.query.id,id:req.query.cartId})
        }

    }
})



module.exports = {getCart,addCart,modifyQuantity,removeCart}