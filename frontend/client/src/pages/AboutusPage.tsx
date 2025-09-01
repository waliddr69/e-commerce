import line from "../assets/minus-horizontal-straight-line.png"
import Subscription from "../pages/SubscriptionPage";


const AboutusPage:React.FC=()=>{
    return(
        <>
        <section className="about-container mt-5">
            <div className="about-head d-flex justify-content-center">
                <h2><span style={{ color: "#383838", fontWeight: "bold" }}>ABOUT</span> US</h2><img src={line} alt="" width={40} height={40} className="mx-2" />
            </div>
            <div className="container mt-5">
                <div className="about-content row g-5">
                    <div className="about-img col-3"></div>
                    <div className="about-text col-8 mx-4">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere exc
                            epturi repudiandae laudantium cumque reiciendis, omnis placeat. Ad dolorum rem expedita?</p><br /><br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni amet porro illo aspernatur suscipit!</p>

                        <p style={{ fontWeight: "bold" }}>Our Mission</p>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus itaque tempora aspernatur laudantium assumenda! Hic co
                            rrupti omnis inventore asperiores ipsa. Odio voluptas dignissimos deserunt adipisci?</p>
                    </div>
                </div>

                <div className="choose-us mt-5">
                    <div className="d-flex">
                        <h3><span style={{ color: "#383838" }}>WHY </span>CHOOSE US</h3><img className="mx-2" src={line} alt="" width={40} height={40} />
                    </div>

                    <div className="cards row mt-4">
                        <div className="quality col-4 p-5">
                            <div className="quality-wrapper">
                                <p style={{ fontWeight: "bold" }}>Quality Assurance</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam architecto tempore adipisci odit, quis ducimus.</p>
                            </div>
                        </div>
                        <div className="quality col-4 p-5">
                            <div className="quality-wrapper">
                                <p style={{ fontWeight: "bold" }}>Convenience</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam architecto tempore adipisci odit, quis ducimus.</p>
                            </div>
                        </div>
                        <div className="quality col-4 p-5">
                            <div className="quality-wrapper">
                                <p style={{ fontWeight: "bold" }}>Exceptional Customer Service</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam architecto tempore adipisci odit, quis ducimus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>
        <Subscription />
        </>
    )
}

export default AboutusPage