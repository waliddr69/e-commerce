
const { required, number } = require("joi");
const mongo = require("mongoose");

const orderSchema = mongo.Schema({
    userId:{
        type:mongo.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    products:[{
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
        }
    }],
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true},
    city:{
        type:String,},
    state:{
        type:String
    },
    country:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    method:{
        type:String,
        enum:["COD","stripe","chargily"],
        required:true
    },
    status:{
        type:String,
        enum:["Out for delivery","Order placed","Delivered"],
        default:"Order placed"
    },
    price:{
        type:Number,
        required:true,

    },
    items:{
        type:Number,
    }
},{
    timestamps:true
})


module.exports = mongo.model("Order",orderSchema)