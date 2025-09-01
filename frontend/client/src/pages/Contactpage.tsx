import line from "../assets/minus-horizontal-straight-line.png"
import Subscription from "../pages/SubscriptionPage";

const Contactpage:React.FC=()=>{
    return(
        <>
        <section className="contact-container mt-5">
            <div className="contact-head d-flex justify-content-center">
                <h2><span style={{color:"#383838",fontWeight:"bold"}}>CONTACT </span>US</h2><img src={line} alt="" width={40} height={40} className="mx-2"/>
            </div>

            <div className="container mt-5">
                <div className="contact-content">
                    
                    <div className="contact-img "></div>
                    <div className="contact-text ">
                        <p style={{fontWeight:"bold"}}>Our Store</p>

                        <p style={{color:"#838383"}}>Mellinium,Bir el Djir,Oran,Algeria</p>

                        <p style={{color:"#838383"}}>Tel:(+213)0798492604</p>
                        <p style={{color:"#838383"}}>Email:waliddari69@gmail.com</p>

                        <p style={{fontWeight:"bold"}}>Careers at Forever</p>

                        <p style={{color:"#838383"}}>Learn more about our team</p>
                    </div>
                </div>
            </div>
        </section>
        <Subscription/>
        </>
        
    )
}

export default Contactpage