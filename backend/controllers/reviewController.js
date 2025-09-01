const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel")

const getReviews = asyncHandler(async(req,res)=>{
     const {productId} = req.query;
    const reviews = await Review.find({productId}).sort({createdAt:-1}).populate("userId");
    res.json({reviews,num:reviews.length})
})
const createReview = asyncHandler(async(req,res)=>{
    console.log(req.user)
    const {productId,content} = req.body;
    const {userId} = req.user;
    console.log(userId)
    const review = await Review.create({
        userId,
        productId,
        content
    })

    await review.populate("userId")

    res.json({review})

})

module.exports = {createReview,getReviews}