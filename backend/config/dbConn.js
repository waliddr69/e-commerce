const mongo = require("mongoose");

const connectDB = async()=>{
    try{
        const connect = await mongo.connect(process.env.MONGO);
        console.log("connection established",connect.connection.host)

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB