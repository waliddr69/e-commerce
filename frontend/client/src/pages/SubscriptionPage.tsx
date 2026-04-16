


const Subscription:React.FC = ()=>{
    return(
        <section className="subscription">
            <div className="subscription-wrapper">
                <div className="subscription-head">
                    <h2 style={{fontWeight:"bold"}}>Subscribe now &  get 20% off</h2>
                </div>
                <div className="subscription-paragraph">
                    <p style={{textAlign:"center"}}>Join our newsletter to stay updated with the latest fashion trends, exclusive offers, and new arrivals. Subscribers get 20% off their first purchase and early access to sales.</p>
                </div>

                <form action="" className="input-group">
                    <input type="email" name="email" placeholder="Enter your email"/>
                    <div className="input-group-prepend">
                    <button  className="input-group-text" type="submit">Subscribe</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Subscription