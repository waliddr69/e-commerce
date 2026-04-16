
import { useHistory } from "react-router-dom";
import type{ Product } from "../models/Collection"

interface params extends Product{
    img?:string | null,
    discount:number

}
const CollectionCard:React.FC<params> = ({img,name,price,_id,discount})=>{
    const history = useHistory();
    const gotoProduct = (id:string)=>{
        history.push("/product/"+id)
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
    return(
        <div className="card col-3 border-0" style={{cursor:"pointer"}} onClick={()=>gotoProduct(_id)}>
            <img src={"http://localhost:5000/"+img} alt="img"/>
            <div className="card-body">
            
            <p className="card-text" style={{color: "#383838"}}>{name}</p>
            {discount ? (
                
                <div style={{display:"flex",flexDirection:"column",gap:"2px"}}>
                    <p className="card-text" style={{ fontWeight: "bold",margin:0,position:"relative",display:'flex',flexDirection:"row",gap:"10px",alignItems:"center" }}><span className="discount" style={{color:"#0000007e"}}>{price} DZD</span> <span style={{backgroundColor:"red",borderRadius:"50%",padding:8,color:"white"}}>{discount}%</span></p>
                    <p className="card-text" style={{ fontWeight: "bold",margin:0 }}>{price! - ((discount*price!)/100)} DZD</p>
                </div>
                
            ):(
                <p className="card-text" style={{fontWeight:"bold"}}>{price} DZD</p>
            )}
            
            
        </div>
        
    </div>
    )

}

export default CollectionCard