import { useContext, useEffect, useState } from "react";
import OrderCard from "../components/orderCard";

import { Product } from "../models/productModel";

type params = {
    _id:string,

    products:[
        {
            productId:Product,
            quantity:number,
            size:string,
            _id:string
        }
    ],
    fname:string,
    lname:string,
    street:string,
    country:string,
    tel:string,
    items:number,
    method:string,
    date:string,
    total:number,
    status:string,
    price:number,
    createdAt: Date
}
const OrderPage:React.FC = ()=>{
    
    const [orders,setOrders] = useState<params[]>([]);
    
    const getOrders = async()=>{
        const req = await fetch(process.env.REACT_APP_API_ORDER_URL +"/getAll",{
            credentials:"include"
        })

        const res= await req.json();
        console.log(res)
        setOrders(res.orders)
    }

    useEffect(()=>{
        getOrders()
    },[])
    console.log(orders)
    return(
        <div className="order-container mb-5">
        <div className="order-wrapper">
            <p style={{fontWeight:"600"}}>Order Page</p>
            {orders.length>0?orders.map(order=>(
                <OrderCard key={order._id} _id={order._id} products={order.products}  name={`${order.fname} ${order.lname}`} street={order.street} country={order.country} tel={order.tel} items={order.items} method={order.method} date={new Date(order.createdAt).toLocaleDateString("en-GB",{
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })} total={order.price} status={order.status}/>
            )):(<h3>No Orders</h3>)}
        </div>
    </div>
    )
    
}

export default OrderPage