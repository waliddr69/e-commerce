import CartCard from "../components/cartCard";
import line from "../assets/minus-horizontal-straight-line.png"

import CartPayement from "../components/cartPayement";
import { useEffect, useState } from "react";

type CartItem = {
    _id:string,
    productId:{
        _id:string,
        img1?: string;
        img2?: string;
        img3?: string;
        img4?: string;
        name: string;
        price: number; 
    }
    
    size: string;
    quantity: number;
    isOrdered:boolean
};

const Cart:React.FC = ()=>{
const [cartId,setCartId] = useState("")
const [cart,setCart] = useState<CartItem[]>([])
const [status, setStatus] = useState<{ [productId: string]: string }>({});

    const getCart = async()=>{
        
        const req = await fetch(process.env.REACT_APP_API_CART_URL as string,{
            credentials:"include"
        })

        const res = await req.json()
        if(res.success){
            setCart(res.products)
            
            setCartId(res.cartId)

        }else{
            setCart([])
        }
    }

const getOrder = async () => {
  const req = await fetch(process.env.REACT_APP_API_ORDER_URL + "/", {
    credentials: "include",
  });

  const res = await req.json();
  

  if (res.order && res.order.length > 0) {
  const newStatuses: { [productId: string]: string } = {};

  cart.forEach((item) => {
    if (item.isOrdered) {
      const foundOrder = res.order.find((order: any) =>
        order.products.some((p: any) => String(p.productId) === String(item.productId._id))
      );
      

      if (foundOrder) {
        newStatuses[item.productId._id] = foundOrder.status;
      }
      
    }
  });

  setStatus(newStatuses);
} else {
  setStatus({});
}
};

const getOrderStatus = async (productId: string) => {
  const req = await fetch(process.env.REACT_APP_API_ORDER_URL as string + "/", {
    credentials: "include"
  });

  const res = await req.json();

  if (res.order.length > 0) {

    const found = res.order.find((order: any) =>
      order.products.some((p: any) => String(p.productId) === String(productId))
    );
    console.log(found)
    if (found) {
      
      setStatus((prev) => ({ ...prev, [productId]: found.status }));
    }
  }
};



      

    useEffect(()=>{
        getCart()
    },[])

   
    useEffect(()=>{
        if(cart.length>0){
        getOrder()}
    },[cart])
    console.log(cart)
    return(

        <div className="cart-container mt-5" style={{width:"80%"}}>
            <div className="cart-head d-flex">
                <h2 style={{}}><span style={{color:"#383838",fontWeight:"bold"}}>YOUR </span>CART</h2> <img src={line} alt="" width={40} height={40} className="mx-2"/>
            </div>
            {cart.length === 0?(
                <h3>No Items for now</h3>

            ):(
                
                cart.map((item,index)=>(

                    <CartCard cartId={cartId} key={item.productId._id} _id={item.productId._id} img={item.productId.img1??item.productId.img2??item.productId.img3??item.productId.img4} name={item.productId.name} 
                    price={item.productId.price} size={item.size} quantity={item.quantity}
                     onDelete={()=>setCart(cart.filter(cart=>cart.productId._id!== item.productId._id))} isOrderd={item.isOrdered} status={status[item.productId._id]} onclick={()=>getOrderStatus(item.productId._id)}/>
                ))
            )}
            
            <hr />
            
            <CartPayement text="PROCEED TO CHECKOUT"/>
        </div>
    )
}

export default Cart