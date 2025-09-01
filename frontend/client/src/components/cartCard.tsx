

import { useContext } from "react";
import remove from "../assets/supprimer.png";
import { CardContext } from "../cardContext";
type params = {
    cartId:string,
    _id:string,
    img?:string,
    name:string,
    price:number,
    size:string,
    quantity:number,
    onDelete:()=>void,
    isOrderd:boolean,
    status:string,
    onclick:()=>void
}
const CartCard: React.FC<params> = ({img,name,price,size,quantity,_id,cartId,onDelete,isOrderd,status,onclick})=>{
    const card = useContext(CardContext)
    
    
    const handleChange = async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const quantity = parseInt(e.target.value);
        console.log(quantity)
        if(quantity > 0 && quantity!==undefined){
        const req = await fetch(process.env.REACT_APP_API_CART_URL as string + "/modify",{
            credentials:"include",
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({quantity:quantity,productId:_id,size:size})
        })

        const res = await req.json();
        card?.refreshItems()}
        
        
    }

    

    const removeItem = async(e:React.FormEvent)=>{
        e.preventDefault()
        console.log(cartId)
        const req = await fetch(process.env.REACT_APP_API_CART_URL + "/delete?cartId="+cartId+"&id="+_id,{
            credentials:"include",
            method:"DELETE"
        })

        const res = await req.json();
        onDelete()

        console.log(res)

        card?.refreshItems()

    }

    console.log(status)

  
    return(
        <div className="cart-element">
            <hr />
            <div className="cart-content d-flex justify-content-between align-items-center">
                <div className="d-flex" style={{gap:"16px"}}>
                    <img src={"http://localhost:5000/"+img} alt="" width={100}/>
                <div className="cart-text">
                    <h4 style={{fontWeight:"600"}}>{name}</h4>
                    <div className="d-flex align-items-center mt-4">
                        <p>{price} DZD</p>
                        <p className="mx-3 size">{size}</p>
                    </div>
                </div>
                </div>
                
            {isOrderd ? (<><div style={{display:"flex",gap:"5px",alignItems:"center"}}><div style={{backgroundColor:"green",borderRadius:"50%",width:"10px",height:"10px"}}></div><p style={{ fontWeight: "600",margin:"0" }}>{status}</p></div></>):<input type="number" defaultValue={quantity} name="cart" onChange={handleChange} min={1} step={1} max={10}/>}
                
            {( status==="Delivered" || status===undefined)?(<form action="" style={{justifySelf:"center"}} onSubmit={removeItem}>
                    <button type="submit" style={{border:"none",backgroundColor:"transparent"}}><img src={remove} alt="" width={30} height={30}/></button>
                </form>):(
                    <button style={{padding:"8px 12px",border:"none"}} onClick={()=>onclick()}>Track Order</button>
                )}    
                
            </div>

            

        </div>
    )
    
}

export default CartCard