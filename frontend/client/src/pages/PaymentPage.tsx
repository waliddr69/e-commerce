import PayementForm from "../components/payementForm"
import CartPayement from "../components/cartPayement"
const PaymentPage:React.FC=()=>{
    return(
        <div className="payement-container d-flex justify-content-between">
            <PayementForm/>
            <CartPayement/>

        </div>

    )
    
}

export default PaymentPage