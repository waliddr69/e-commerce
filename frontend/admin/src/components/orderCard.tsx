import { count } from "console"
import { useState } from "react"
import { Product } from "../models/productModel"

type params = {
    _id:string
    products:[{
        productId:Product,
        _id:string,
        quantity:number,
        size:string
    }]
    name:string,
    street:string,
    country:string,
    tel:string,
    items:number,
    method:string,
    date:string,
    total:number|undefined,
    status:string
}

const OrderCard:React.FC<params> = ({_id,name,street,country,tel,items,method,date,total,status,products})=>{
    const [currentStatus, setCurrentStatus] = useState(status)
    console.log(status)
    const handleChange = async(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setCurrentStatus(e.target.value)
        const value = e.target.value
        const req = await fetch(process.env.REACT_APP_API_ORDER_URL+"/put",{
            method:"PATCH",
            headers: { "Content-Type": "application/json" },

            credentials:"include",
            body:JSON.stringify({status:value,id:_id})
        })

        const res = await req.json();
        console.log(res)
    }
    return(
        <div className="order-card rounded p-3">
            <div className="card-wrapper d-flex justify-content-between">
                <span className="material-symbols-rounded" style={{color:"black"}}>package_2</span>
                <div className="order-info">
                    <div className="orders">
                        {products.map((order)=>(
                        <p key={order.productId._id}>{order.productId.name}</p>
                    ))}
                    </div>
                    
                    <p className="name" style={{fontWeight:"600"}}>{name}</p>

                    <div className="location">
                        <p>{street}</p>
                        <p>{country}</p>
                        <p>{tel}</p>
                    </div>
                </div>
                <div className="order-payement">
                    <p>items:{items} </p><br />
                    <p>Method:{method} </p>
                    <p>Payement:{method === "COD" && (status==="Order placed" ||status==="Out for delivery") ? "pending":"Done"}</p>
                    <p>Date:{date} </p>
                </div>

                <p className="price">{total}$</p>

                <select 
                name="status" 
                value={currentStatus} 
                onChange={handleChange}
                >
                    <option value="Order placed">Order placed</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>

            </div>
        </div>
    )
}

export default OrderCard