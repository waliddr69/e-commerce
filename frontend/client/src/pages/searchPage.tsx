import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Product } from "../models/Collection";
import CollectionCard from "../components/collectionCard";

const SearchPage:React.FC = ()=>{

    const query = new URLSearchParams(useLocation().search)
    const [results,setResult] = useState<Product[] | null>(null)
    const q = query.get("q")||"";
    useEffect(()=>{
        if(q){
                fetch("http://localhost:5000/v1/api/products/search?q="+q)
                .then(res=>res.json())
                .then(res=>{
                    if(res.search.length>0){
                        setResult(res.search)
                        
                    }else{
                        setResult(null)
                    }
                    console.log(results)
                })
        }
    },[q])
    
    return(
        <>
        <h1 className="mt-5 p-5">Search Results for : {q}</h1>
        
            {results === null?(
                <h3 style={{justifySelf:"center"}}>no search results for "{q}" </h3>
            ):(
                <>
                <div className="row mt-5 w-50">
                {results.map(result=>(
                    <CollectionCard _id={result._id} img={result.img1??result.img2??result.img3??result.img4} price={result.price} name={result.name} key={result._id}/>
                ))}
            </div>
                </>
            
            )}
        
        </>
    )
}

export default SearchPage