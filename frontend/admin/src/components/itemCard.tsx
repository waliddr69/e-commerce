

import { useEffect } from "react";
import type { Product } from "../models/productModel";
interface ItemCardProps extends Product {
  onDelete: (id: string) => void;
  img?: string | null
}
const ItemCard:React.FC<ItemCardProps> = ({name,category,price,img,_id,onDelete})=>{
    
   const handleDelete =  async(e:React.MouseEvent)=>{
        
        const req = await fetch(process.env.REACT_APP_API_PRODUCT_URL+"/delete/"+_id,{
            method:"DELETE"
        })

        const res = await req.json()
        
        if(res.success) onDelete(res.id)
        

   }
    
    return(
        <>
        
        <div className="item-card" id={_id}>
            <div className="item-card-wrapper row">
                <div className="col-2">
                    <img src={"http://localhost:5000/"+img} alt="" width={100} height={120}/>
                </div>
                
                <p className="col-4" style={{alignSelf:"center"}}>{name}</p>
                <p className="col-2" style={{alignSelf:"center"}}>{category}</p>
                <p className="col-2" style={{alignSelf:"center"}}>{price} DZD</p>
                <span className="material-symbols-rounded col-2" style={{color:"black",cursor:"pointer",alignSelf:"center"}} onClick={handleDelete}>close</span>
            </div>
        </div>
        
        
        </>
        
    )
}

export default ItemCard