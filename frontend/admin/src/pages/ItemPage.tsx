import { useEffect, useState } from "react";
import ItemCard from "../components/itemCard";
import { Product } from "../models/productModel";


const ItemPage:React.FC=()=>{
    const [items,setItems] = useState<Product[]>([])
    useEffect(()=>{
        
        fetch(process.env.REACT_APP_API_PRODUCT_URL as string)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                setItems(res.products)
                
            }
            
        })
    },[])

    const handleDelete = (id:string)=>{
        setItems(items.filter(item=>item._id !== id))
    }
    return(
    <div className="items-container">
        <div className="items-wrapper">
            <p style={{fontWeight:"600"}}>All Products List</p>
            <div className="d-flex list">
                <div className="row  pt-2 headers">
                    <p className="col-2" style={{fontWeight:"bold"}}>Image</p>
                    <p className="col-4" style={{fontWeight:"bold"}}>Name</p>
                    <p className="col-2" style={{fontWeight:"bold"}}>Category</p>
                    <p className="col-2" style={{fontWeight:"bold"}}>Price</p>
                    <p className="col-2" style={{fontWeight:"bold"}}>Action</p>
                </div>
                {items.map(item=>(
                    
                    <ItemCard  name={item.name} category={item.category} price={item.price} img={item.img1??item.img2??item.img3??item.img4} key={item._id} _id={item._id} onDelete={handleDelete}/>
                
                ))}
                
            </div>
        </div>
    </div>
)
}

export default ItemPage