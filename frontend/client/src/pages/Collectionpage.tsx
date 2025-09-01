import { useEffect, useState } from "react"
import type { Product } from "../models/Collection"

import line from "../assets/minus-horizontal-straight-line.png"
import CollectionCard from "../components/collectionCard"
const Collectionpage:React.FC=()=>{
    const [collections,setCollection] = useState<Product[] | null>(null)

    
        const [men,setMen] = useState("")
        const [women,setWomen] = useState("")
        const [kids,setKid] = useState("")
        const [topwear,setTopwear] = useState("")
        const [bottomwear,setBottom] = useState("")
        const [winterwear,setWinter] = useState("")
        const [price,setPrice] = useState(0)
        const [fil,setfil] = useState(false)
        const [limitpro,setlimitpro] = useState(6)
        const [limitfil,setlimitfil] = useState(6)
        
        const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
            if(e.target.value == "lowToHigh"){
                setPrice(1)
            }else if(e.target.value === "highToLow"){
                setPrice(-1)
            }else{
                setPrice(0)
            }
        }

        const getProducts = ()=>{
            fetch(process.env.REACT_APP_API_PRODUCT_URL as string+"?limit="+limitpro)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                
                setCollection(res.products)
                setlimitpro(limitpro+6)
            }
        })
        }
        
        useEffect(()=>{
            getProducts()
            
        },[])

        const handleFilter = ()=>{
            fetch(process.env.REACT_APP_API_PRODUCT_URL + "/filter?limit="+limitfil,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({data:{
                category:[men,women,kids],
                sub:[topwear,bottomwear,winterwear],
                priceSort:price

            }})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                setCollection(res.product)
                setlimitfil(limitfil+6)
                console.log(res.product)
            }else{
                setCollection(null)
            }
        })}
        
        
    useEffect(()=>{
        
        
        if(men!=="" || women!=="" || kids!==""||topwear!==""||bottomwear!==""||winterwear!==""||price!==0){
            setfil(true)
            handleFilter()

        
 } },[men, women, kids, topwear, bottomwear, winterwear,price])
    return(
        
            <div className="container mt-5">
                <div className="row g-5">

                
                <div className="filters col-3">
                    <div className="filters-wrapper">
                    <h3 style={{fontWeight:"bold"}}>FILTERS</h3>
                        <form action="">
                            <div className="form-wrapper">
                                <h4 style={{fontWeight:"600",fontSize:"20px"}}>CATEGORIES</h4>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="men" onChange={e=>e.target.checked ? setMen("Men"):setMen("")}/> <label htmlFor="">Men</label>
                                </div>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="women" onChange={e=>e.target.checked ? setWomen("Women"):setWomen("")}/> <label htmlFor="">Women</label>
                                </div>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="kids" onChange={e=>e.target.checked ? setKid("Kids"):setKid("")}/> <label htmlFor="">Kids</label>
                                </div>
                            </div>
                            

                        </form>

                        <form action="">
                            <div className="form-wrapper">
                                <h4 style={{fontWeight:"600",fontSize:"20px"}}>Type</h4>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="Topwear" onChange={e=>e.target.checked ? setTopwear("Topwear"):setTopwear("")}/> <label htmlFor="">Topwear</label>
                                </div>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="Bottomwear" onChange={e=>e.target.checked ? setBottom("Bottomwear"):setBottom("")}/> <label htmlFor="">Bottomwear</label>
                                </div>
                                <div className="checkbox-element">
                                    <input type="checkbox" name="Winterwear" onChange={e=>e.target.checked ? setWinter("Winterwear"):setWinter("")}/> <label htmlFor="">Winterwear</label>
                                </div>
                            </div>
                            

                        </form>
                    </div>
                </div>
                <div className="collection col-8">
                    <div className="collections-wrapper d-flex justify-content-between">
                        <div className="d-flex w-50 ">
                            <h2 ><span style={{color:"#383838",fontWeight:"bold"}}>ALL </span>COLLECTIONS</h2> <img src={line} alt="" width={40} height={40} className="mx-2"/>
                        </div>

                        <div className="dropdown d-flex justify-content-end">
                        <select name="sort" id="" className="p-2" onChange={handleChange}>
                            <option value="Relevent">Sort by:Relavent</option>
                            <option value="lowToHigh">Sort by:Low to High</option>
                            <option value="highToLow">Sort by:High To Low</option>
                        </select>
                        </div>

                    </div>

                    <div className="all-collections row">
                        {collections == null ? (<h3>nothing matches your filtering</h3>):(
                            collections.map(collection=>(
                                <CollectionCard key={collection._id} _id={collection._id} img={collection.img1??collection.img2??collection.img3??collection.img4} name={collection.name} price={collection.price}/>
                            ))
                        )}

                        <button style={{padding:"8px 32px",borderRadius:"6px",border:"none"}} onClick={()=>fil ? handleFilter():getProducts()}>Load More</button>
                    </div>

                    
                </div>
                </div>
            </div>
            
        
    )
}

export default Collectionpage