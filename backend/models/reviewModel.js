const { required } = require("joi");
const mongo = require("mongoose");


const reviewSchema = mongo.Schema({
    userId:{
        type:String,
        required:true,
        ref:'User'
    },
    productId:{
        type:String,
        required:true,
        ref:'Product'
    },
    content:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

module.exports = mongo.model("Review",reviewSchema)