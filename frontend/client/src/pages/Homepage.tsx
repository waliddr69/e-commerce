import line from "../assets/minus-horizontal-straight-line.png"
import model from "../assets/averie-woodard-4nulm-JUYFo-unsplash.jpg"
import CollectionCard from "../components/collectionCard"
import { useEffect, useState } from "react";
import { Product } from "../models/Collection";
import thunder from "../assets/thunder.png"
import Subscription from "../pages/SubscriptionPage";

import check from "../assets/check.png"
import client from "../assets/customer-service-headset.png"
import "../style.css"


const Homepage:React.FC = ()=>{

    const [collections,setCollection] = useState<Product[]>([])
    const[seller,setSeller] = useState<Product[]>([])
    
    useEffect(()=>{
        fetch(process.env.REACT_APP_API_PRODUCT_URL + "/latest")
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                setCollection(res.product)
            }
        })
        fetch(process.env.REACT_APP_API_PRODUCT_URL + "/bestseller")
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                setSeller(res.product)
            }
        })

    },[])
    
    
    return(
        <>
        <section className="hero row">
            <div className="head-title col-6">
                <div><img src={line} alt="" width={60} height={60} />  <h4 style={{color : "#383838"}}>OUR BESTSELLERS</h4></div>
                <h1>Latest Arrivals</h1>
                <div><h4 style={{color : "#383838"}}>SHOP NOW</h4>  <img src={line} alt="" width={60} height={60}/></div>
                
            </div>
            <div className="hero-img col-6">
                
            </div>
        </section>

        <section className="collections">
            <div className="collection-wrapper">
                <div className="collection-head">
                    
                    <h2 style={{fontWeight:"bold"}}><span style={{color:"#383838"}}>LATEST</span> COLLECTION</h2><img src={line} alt="" width={60} height={60}/>
                </div>
                <div className="collection-paragraph">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, quis blanditiis fugit at vel maiores.</p>
                </div>
                <div className="collection-content row g-5">
                {collections.length>0 ? (
                    collections.map(collection=>(
                        <CollectionCard key={collection._id} _id={collection._id} img={collection.img1??collection.img2??collection.img3??collection.img4} name={collection.name} price={collection.price}/>
                    ))
                ):<h3>no collections</h3>}
                </div>
            </div>
        </section>

        <section className="collections best-seller">
            <div className="collection-wrapper">
                <div className="collection-head">
                    
                    <h2 style={{fontWeight:"bold"}}><span style={{color:"#383838"}}>BEST</span> SELLERS</h2><img src={line} alt="" width={60} height={60}/>
                </div>
                <div className="collection-paragraph">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, quis blanditiis fugit at vel maiores.</p>
                </div>
                <div className="collection-content row g-5">
                {seller.length>0 ? (
                    seller.map(seller=>(
                        <CollectionCard _id={seller._id} img={seller.img1??seller.img2??seller.img3??seller.img4} name={seller.name} price={seller.price} key={seller._id}/>
                    ))
                ):<h3>no collections</h3>}
                </div>
            </div>
        </section>

        <section className="offers">
            <div className="offer">
                <img src={thunder} alt="" width={40} height={40}/>
                <p style={{fontWeight:"bold"}}>Easy Exchange Policy</p>
                <p style={{color:"#838383",fontWeight:"bold"}}>We offer hasle exchange policy</p>
            </div>
            <div className="offer">
                <img src={check} alt="" width={40} height={40}/>
                <p style={{fontWeight:"bold"}}>Easy Exchange Policy</p>
                <p style={{color:"#838383",fontWeight:"bold"}}>We offer hasle exchange policy</p>
            </div>
            <div className="offer">
                <img src={client} alt="" width={40} height={40}/>
                <p style={{fontWeight:"bold"}}>Easy Exchange Policy</p>
                <p style={{color:"#838383",fontWeight:"bold"}}>We offer hasle exchange policy</p>
            </div>
        </section>
        <Subscription/>
        

        
        </>
        

    )
}

export default Homepage