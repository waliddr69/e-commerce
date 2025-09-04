require("dotenv").config()
const cors = require("cors")
const products = require("./routes/productRoutes")
const express = require("express");

const bodyParser = require("body-parser")
const path = require("path")
const db = require("./config/dbConn")
const cookie = require("cookie-parser")
const errorHandler = require("./middleware/errorHandler")
const app = express()




db()
app.use(cookie())
app.use(cors({
  origin: [process.env.FRONTEND_URL,process.env.ADMIN_URL],
  credentials: true 
}));

app.use("/webhook",bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}),require("./routes/webhookRoute"))
app.use(express.json())
app.use("/v1/api/products",products)
app.use("/v1/api/users",require("./routes/userRoutes"))
app.use("/v1/api/cart",require("./middleware/validateTokenHandler"),require("./routes/cartRoutes"))
app.use("/v1/api/pay",require("./middleware/validateTokenHandler"),require("./routes/payementRoutes"))
app.use("/v1/api/orders",require("./middleware/validateTokenHandler"),require("./routes/orderRoute"))
app.use("/v1/api/reviews",require("./routes/reviewRoutes"))


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(errorHandler)
const port = process.env.PORT ?? 5001
app.listen(port,()=>{
    console.log("listening on port "+port)
})