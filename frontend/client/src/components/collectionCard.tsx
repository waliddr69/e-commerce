
import { useHistory } from "react-router-dom";
import type{ Product } from "../models/Collection"

interface params extends Product{
    img?:string | null,

}
const CollectionCard:React.FC<params> = ({img,name,price,_id})=>{
    const history = useHistory();
    const gotoProduct = (id:string)=>{
        history.push("/product/"+id)
        window.location.reload()
    }
    return(
        <div className="card col-3 border-0" style={{cursor:"pointer"}} onClick={()=>gotoProduct(_id)}>
            <img src={"http://localhost:5000/"+img} alt="img"/>
            <div className="card-body">
            
            <p className="card-text" style={{color: "#383838"}}>{name}</p>
            <p className="card-text" style={{fontWeight:"bold"}}>{price} DZD</p>
            
        </div>
        
    </div>
    )

}

export default CollectionCard