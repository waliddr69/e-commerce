const mongo = require("mongoose")

const userSchema = mongo.Schema({
  username: {
    type: String,
    required: function () {
      return this.role === "user"; // required only for normal users
    },
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: ()=>{
      return this.supabaseId === null
    },
  },
  supabaseId:{
    type:String,
    default:null
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  region:String,
  discount:Number
}, { timestamps: true });

module.exports =  mongo.model("User", userSchema);
