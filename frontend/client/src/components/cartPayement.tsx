import { Link } from "react-router-dom"

import line from "../assets/minus-horizontal-straight-line.png"
import { useContext } from "react"
import { CardContext } from "../cardContext"

type params = {text?:string}



const CartPayement:React.FC<params> = ({text})=>{

    const cart = useContext(CardContext)
    return(
        <div className="cart-payement mt-5 d-flex justify-content-end">
                <div className="cart-total w-50 d-flex ">
                <div className=" d-flex">
                    <h2 style={{}}><span style={{color:"#383838",fontWeight:"bold"}}>CART </span>TOTALS</h2> <img src={line} alt="" width={40} height={40} className="mx-2"/>
                </div>

                <div className="subtotal d-flex justify-content-between">
                    <p>Subtotal</p>
                    <p>{(cart?.total)?.toFixed(2)} DZD</p>
                </div>
                <hr />

                <div className="shipping d-flex justify-content-between">
                    <p>Shipping Fee</p>
                    <p>{process.env.REACT_APP_SHIPPING_FEE} DZD</p>
                </div>
                <hr />
                <div className="total d-flex justify-content-between">
                    <p style={{fontWeight:"bold"}}>total</p>
                    <p style={{fontWeight:"bold"}}>{cart?.total !== undefined && process.env.REACT_APP_SHIPPING_FEE !== undefined && (cart.total === 0 ?(0):parseFloat((cart?.total).toFixed(2)) + Number(process.env.REACT_APP_SHIPPING_FEE))} DZD</p>
                </div>
                {text && cart?.total!==0 && (
                  <Link to={"/pay"}><button>{text}</button></Link>  
                )}
                
                

                </div>
            </div>
    )
}

export default CartPayement