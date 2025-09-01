
const mongo = require("mongoose")


const productSchema = mongo.Schema({
    name:{
        type:String,
        required:[true,"name should be added"]
    },
    description:{
        type:String,
        required:[true,"description should be added"]
    },
    category:{
        type:String,
        required:[true,"category should be added"],
        enum:["Men","Women","Kids"]
    },
    subCategory:{
        type:String,
        required:[true,"sub category must be provided"],
        enum:["Topwear","Bottomwear","Winterwear"]
    },
    price:{
        type:Number,
        required:[true,"price should be provided"]
    },
    sizes:{
        type:[String],
        required:[true,"size should be added"],
        enum:["S","M","L","XL","XXL"]
    },
    bestseller:{
        type:Boolean,
        
    },
    img1: { type: String},   // main required image
    img2: { type: String },                   // optional
    img3: { type: String },                   // optional
    img4: { type: String }, 
    Reviews:{type:Number,default:0}    
},{
    timestamps:true
})

productSchema.index({category:1})
productSchema.index({subCategory:1})
productSchema.index({price:1})
productSchema.index({name:"text"})

module.exports = mongo.model("Product",productSchema)