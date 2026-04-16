import { useContext, useEffect, useState } from "react";
import line from "../assets/minus-horizontal-straight-line.png"
import { useWS } from "../webSocketContext";
import { Product } from "../models/Collection";
import CollectionCard from "../components/collectionCard";
import { AuthContext } from "../AuthContext";

const RecommendPage:React.FC = () => {
    const {message} = useWS() as any
    const [clicks,setClicks] = useState<Product[]>([])
    const [searches,setSearches] = useState<Product[]>([])
    const [purchases,setPurchases] = useState<Product[]>([])
    const {discount} = useContext(AuthContext) as any
    
    const getClicks = async ()=>{
        try{
            if(!message.clicks && !message.searches && !message.purchases) return
            const req = await fetch(process.env.REACT_APP_API_PRODUCT_URL + "/getRec",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({clicks:message?.clicks ||[],searches:message?.searches || [],purchases:message.purchases})
            })

            const res = await req.json()
            if(res.success){
                setClicks(res.clicks)
                setSearches(res.searches)
                setPurchases(res.purchases)
            }
        }catch(e){
            console.log(e)
        }finally{

        }
    }

    useEffect(()=>{
        getClicks()
    },[message])
  return (
    <div className="container mt-5">
      <div className="row g-5 justify-content-center">
        {(clicks.length==0 && searches.length==0 && purchases.length==0) ?(
          <h3 style={{textAlign:"center"}}>You have no recommendations</h3>
        ):(
          <div className="collection col-8">
          <div className="collections-wrapper d-flex justify-content-between">
            <div className="d-flex w-50 ">
              <h2>
                
                RECOMMENDATIONS
              </h2>
              <img src={line} alt="" width={40} height={40} className="mx-2" />
            </div>

            
          </div>
          {clicks.length>0 && (
            <><h3 className="mt-5">Recommended to you based on what you've seen</h3><div className="all-collections row">
                  {clicks.map(collection => (
                    <CollectionCard discount={discount} key={collection._id} _id={collection._id} img={collection.img1 ?? collection.img2 ?? collection.img3 ?? collection.img4} name={collection.name} price={collection.price} />
                  ))}


                </div></>
          )}
          {searches.length>0 && (
            <><h3 className="mt-2">Recommended to you based on what you've searched</h3><div className="all-collections row">
                  {searches.map(collection => (
                    <CollectionCard discount={discount} key={collection._id} _id={collection._id} img={collection.img1 ?? collection.img2 ?? collection.img3 ?? collection.img4} name={collection.name} price={collection.price} />
                  ))}



                </div></>
          )}
          {purchases.length>0 && (
            <><h3 className="mt-2">Recommended to you based on what you've buyed</h3><div className="all-collections row">

                  {purchases.map(collection => (
                    <CollectionCard discount={discount} key={collection._id} _id={collection._id} img={collection.img1 ?? collection.img2 ?? collection.img3 ?? collection.img4} name={collection.name} price={collection.price} />
                  ))}

                </div></>
          )}
          
        </div>
        )}
        
      </div>
    </div>
  );
};

export default RecommendPage;
