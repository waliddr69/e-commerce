const mongo = require("mongoose")

const cartSchema = mongo.Schema({
    userId:{
        type:mongo.Schema.Types.ObjectId,
        required:true,
        ref:"User"

    },
    products:[
        {
            productId:{
                type:mongo.Schema.Types.ObjectId,
                required:true,
                ref:"Product"
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            size:{
                type:String,
                required:true
            },
            isOrdered:{
                type:Boolean,
                default:false,
            }
        }
    ]
},{
    timestamps:true})

module.exports = mongo.model("Cart",cartSchema)