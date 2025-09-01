const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);
const axios = require("axios")
const {ChargilyClient } = require("@chargily/chargily-pay")

const createPay = asyncHandler(async (req, res) => {
    const {fname,lname,email,street,city,state,country,zipcode,phone,method,price,products} = req.body;
    console.log(fname,lname,email,street,city,state,country,zipcode,phone,method,price,products)
    if(method === "stripe"){
    

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(price * 100), 
        currency: "dzd",
        automatic_payment_methods: { enabled: true }, 
    });

    console.log("PaymentIntent Secret:", paymentIntent.client_secret);

    res.json({ clientSecret: paymentIntent.client_secret });}
    if(method === "chargily"){



const total = price + parseFloat(process.env.SHIPPING_FEE || "0");
const response = await axios.post("https://pay.chargily.net/test/api/v2/checkouts",
  {
    amount: total,
    currency: "dzd",
    success_url: `${process.env.FRONTEND_URL}/cart`,
    failure_url: `${process.env.FRONTEND_URL}/pay`,
    metadata:{
        userId:req.user.userId,
        fname,
        lname,
        email,
        street,
        city,
        state,
        country,
        zipcode,
        phone,
        products:JSON.stringify(products)
    }
    
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

res.json({response:response.data,checkout_url:response.data.checkout_url,gateway:"chargily"})


}
if(method === "COD"){
    res.json({gateway:"COD"})
}
})



module.exports = { createPay};
