


const Subscription:React.FC = ()=>{
    return(
        <section className="subscription">
            <div className="subscription-wrapper">
                <div className="subscription-head">
                    <h2 style={{fontWeight:"bold"}}>Subscribe now &  get 20% off</h2>
                </div>
                <div className="subscription-paragraph">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, consequatur? Tempora nobis eos eum deleniti.</p>
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