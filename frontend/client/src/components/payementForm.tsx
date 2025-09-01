
import line from "../assets/minus-horizontal-straight-line.png"
import stripes from "../assets/stripe.png"
import chagily from "../assets/logo2Light.jpg"
import { useContext, useState } from "react"
import { CardContext } from "../cardContext"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom"

const PayementForm:React.FC = ()=>{
const [message,setMessage] = useState("")
const cart = useContext(CardContext)
const stripe = useStripe();
const elements = useElements();
const history = useHistory()
const [style,setstyle] = useState("red")
const [method,setmethod] = useState("")

    const handleSubmit = async(e:React.FormEvent)=>{
        
        if(!stripe || !elements){
            return;
    }
        e.preventDefault();

        
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form);

        const fields = {
            
            cartId:cart?.id,
            fname:formData.get("f_name") ?? "",
            lname:formData.get("l_name") ?? "",
            email:formData.get("email") ?? "",
            street:formData.get("street") ?? "",
            city: formData.get("city") ?? "",
            state:formData.get("state") ?? "",
            zipcode:formData.get("zipcode") ?? "",
            country:formData.get("country") ?? "",
            phone:formData.get("phone") ?? "",
            method:formData.get("payement") ?? "",
            price:cart?.total || 0 + (Number(process.env.REACT_APP_SHIPPING_FEE) || 0),
            products:cart?.products
        }

        for (const key of Object.keys(fields) as Array<keyof typeof fields>) {
            if (fields[key] === "") {
            setMessage(`Missing value for ${key}`);
            return; 
        }  
        }

        console.log(fields)

        
            fetch(process.env.REACT_APP_API_PAYEMENT_URL+"/create",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(fields)
        })
        .then(res=>res.json())
        .then(async(res)=>{
            console.log(res)
            const clientSecret = res.clientSecret;
            const cardElement = elements?.getElement(CardElement);
            if(res.gateway === "chargily"){
                window.location.href = res.checkout_url;
                return;
            }
    if ((method === "stripe" && cardElement) || res.gateway === "COD") {
        let paymentResult;
        if (method === "stripe" && cardElement) {
            paymentResult = await stripe?.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${fields.fname} ${fields.lname}`,
                        email: fields.email as string,
                    }
                }
            });
        } else {
            paymentResult = { error: null, paymentIntent: { status: "succeeded" } };
        }

    if (paymentResult && 'paymentIntent' in paymentResult) {
        const { error, paymentIntent } = paymentResult as { error: any; paymentIntent: { status: string } };
        console.log(paymentIntent);
        if (error && method === "stripe") {
            console.log(error.message);
            setMessage(error.message || "payement failed");
            return;
        }
        if ((paymentIntent && paymentIntent.status==="succeeded")||res.gateway === "COD") {
            setMessage(" Payment successful!,Redirecting...");
            setstyle("green");
            try {

                const req = await fetch(process.env.REACT_APP_API_ORDER_URL + "/add", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(fields)
                });

                const resOrder = await req.json();
                console.log(resOrder);

            } catch (e) {
                console.error("error " + e);
            }

            form.reset();
            history.push("/cart");
        }
    }
        }})
        .catch(err=>console.log(err))
        

        

        
        
        


    }



    return(

        
        <form action="" className="w-50" onSubmit={handleSubmit}>
            
            <div className="d-flex">
                <h2 style={{}}><span style={{color:"#383838",fontWeight:"bold"}}>DELIVERY </span>INFORMATION</h2> <img src={line} alt="" width={40} height={40} className=""/>
            </div>
            <p style={{color:style,fontWeight:"600"}}>{message}</p>
            <div className="name d-flex">
                <input type="text" className="form-control" placeholder="First Name" name="f_name"/>
                <input type="text" className="form-control" placeholder="Last Name" name="l_name"/>
            </div>

            <input type="email" placeholder="Email address" className="form-control" name="email"/>
            <input type="text" placeholder="Street" className="form-control" name="street"/>

            <div className="location">
                <input type="text" placeholder="City" className="form-control" name="city"/>
                <input type="text" placeholder="State" className="form-control" name="state"/>
                <input type="text" placeholder="Zipcode" className="form-control" name="zipcode"/>
                <input type="text" placeholder="Country" className="form-control" name="country"/>
            </div>

            <input type="tel" className="form-control" placeholder="Phone" name="phone"/>
            <div className="d-flex align-items-center">
                <h4 style={{}}><span style={{color:"#383838",fontWeight:"bold"}}>PAYEMENT </span>METHOD</h4> <img src={line} alt="" width={40} height={40} className="mx-2"/>
            </div>

            <div className="payement-method">
                <div className="pay">
                    
                   <input type="radio" value={"stripe"} name="payement" id="stripe" onChange={(e:React.ChangeEvent)=> setmethod("stripe")} />
                <label htmlFor="stripe"><div className="choosen"></div><img src={stripes} alt="" width={80} height={40}/></label> 
                </div>
                <div className="pay">
                   <input type="radio" value={"chargily"} name="payement" id="chargily" onChange={(e:React.ChangeEvent)=> setmethod("chargily")}/>
                <label htmlFor="chargily"><div className="choosen"></div><img src={chagily} alt="" width={80} height={40}/></label> 
                </div>
                <div className="pay">
                   <input type="radio" value={"COD"} name="payement" id="cod" onChange={(e:React.ChangeEvent)=> setmethod("COD")}/>
                <label htmlFor="cod" style={{height:"57px"}}><div className="choosen"></div>CASH ON DELIVERY</label> 
                </div>
                
                

            </div>

            {method === "stripe" && (
            <div style={{ marginTop: "20px" }}>
            <label htmlFor="card-element" style={{ fontWeight: "bold" }}>
                Card Information
             </label>
            <div className="form-control" style={{ padding: "10px" }}>
                <CardElement id="card-element" />
            </div>
            </div>
        )}  


           

            <button type="submit">PLACE ORDER</button>

            



        </form>
    )
}

export default PayementForm


