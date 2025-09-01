import { Link, RouteComponentProps } from "react-router-dom";
import ProductImg from "../components/ProductImg";
import { CardContext } from "../cardContext";
import { Product } from "../models/Collection";
import { useContext, useEffect, useRef, useState } from "react";
import line from "../assets/minus-horizontal-straight-line.png"
import CollectionCard from "../components/collectionCard";
import { AuthContext } from "../AuthContext";
import React from "react";

type params = {id:string}
interface Review  {
    id:string,
    userId:{
        username:string,
        email:string,
        password:string,
        role:string,
        avatar:string
    }
    content:string
}

const ProductPage: React.FC<RouteComponentProps<params>> = ({ match }) => {
    const [col,setcol] = useState<Product|null>(null)
    const auth = useContext(AuthContext)
    const [content,setContent] = useState("")
    const [reviews,setReviews] = useState<Review[]>([])
    const [collections,setCollection] = useState<Product[]|null>(null)
    const card = useContext(CardContext)
    const [img1,setimg1] = useState<string | undefined>(undefined)
    const [img2,setimg2] = useState<string | undefined>(undefined)
    const [img3,setimg3] = useState<string | undefined>(undefined)
    const [img4,setimg4] = useState<string | undefined>(undefined)
    
    const reviewsRef = useRef<HTMLDivElement | null>(null);
    const [numRev,setNumRev] = useState(0)
    useEffect(() => {
  if (reviewsRef.current) {
    reviewsRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [reviews]);
    useEffect(()=>{
        fetch("http://localhost:5000/v1/api/products/"+match.params.id)
        .then(res=>res.json())
        .then(res=>{
            
            const images = [res.product.img1,res.product.img2,res.product.img3,res.product.img4].filter(image=>image!==null)
            setcol(res.product)
            if(res.product){
                
                
                
                setimg1(images[0])
                setimg2(images[1]??undefined)
                setimg3(images[2]??undefined)
                setimg4(images[3]??undefined)
                
                

            }
        })
        

    },[match.params.id])

    const addToCart = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const size = formData.get("size")
        console.log(process.env.REACT_APP_API_CART_URL)
        if(auth?.avatar !== null){
            
            fetch(process.env.REACT_APP_API_CART_URL as string+"/add",{
                credentials:"include",
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productId:match.params.id,
                    size:size
                })
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                if(res.success){
                    console.log(res.cart)
                    card?.refreshItems()
                }else{
                    console.log(res.message,res.id)
                }
            })
            .catch(err=>console.log(err))

        }
    }
const getReviews = ()=>{
            fetch(process.env.REACT_APP_API_REVIEW_URL as string+"?productId="+match.params.id)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setReviews(res.reviews)
            setNumRev(res.num)

        })
    }
    const handleReview = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = e.currentTarget
        if(content!==""){
        const req = await fetch(process.env.REACT_APP_API_REVIEW_URL+"/create",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({productId:match.params.id,content:content})
        })

        const res = await req.json();
        if(res.review){
            getReviews()
            
        }
        form.reset()
    }
    }

    
    useEffect(()=>{
        fetch("http://localhost:5000/v1/api/products/related?category="+col?.category+"&sub="+col?.subCategory+"&execludeId="+match.params.id)
        .then(res=>res.json())
        .then(res=>{
            
            if(res.product.length>0){
                setCollection(res.product)
            }else{
                setCollection(null)
            }
        })
        

    },[col?.subCategory,col?.category,match.params.id])

    useEffect(()=>{
        getReviews()
    },[])

    console.log(reviews)
    

    
    

    

    
    return(
        <div className="product-container mt-5">
            {col != null ? (
                <>
                <div className="product-description">
                <ProductImg img1={"http://localhost:5000/"+img1} img2={"http://localhost:5000/"+img2} img3={"http://localhost:5000/"+img3} img4={"http://localhost:5000/"+img4} />
                <div className="product-text">
                    <h3 style={{fontWeight:"600"}}>{col.name}</h3>
                    <p>{numRev} reviews</p><br />

                    <h2 style={{fontWeight:"bold"}}>{col.price} DZD</h2>

                    <p style={{color:"#838383"}}>{col.description} </p>


                    <form onSubmit={addToCart}>
                        <p style={{ fontWeight: "bold" }}>Select Size</p>

                        <div className="sizes">
                        {col.sizes?.map(size => (
                        <React.Fragment key={size}>
                             <input
                              type="radio"
                                name="size"
                                id={`size-${size}`}
                                disabled={!auth?.avatar}
                                value={size}
                                />
                                <label htmlFor={`size-${size}`}>{size}</label>
                        </React.Fragment>
                        ))}
                        </div>

                        {auth?.avatar ? (
                        <button type="submit">ADD TO CART</button>
                        ) : (
                        <Link to="/login">
                        <button type="button">ADD TO CART</button>
                        </Link>
                        )}
                    </form>

                </div>


            </div> 

            <div className="reviews mt-5">
                <div className="reviews-head">
                        <h2 style={{fontWeight:"bold"}}>REVIEWS</h2><img src={line} alt="" className="mx-3" width={40} height={40}/>
                    </div>
                <div className="review-wrapper p-5"ref={reviewsRef} >
                    
                    <div className="reviews-text" >
                        {reviews.length>0 ? reviews.map(review=>(
                            <div className="reviews-text-wrapper" key={review.id}>
                            <div className="profile-pic" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <img src={review.userId.avatar} alt="" style={{width:"40px",height:"40px",borderRadius:"50%"}}/>
                            </div>
                            <div className="review">
                                <p style={{color:"#838383"}}>{review.userId.username}</p>
                                <p>{review.content}</p>
                            </div>
                        </div>
                        )):(<h3>No Reviews</h3>)}
                                                
                    </div>
                    
                    
                </div>
                {auth?.avatar && (<form action="" onSubmit={handleReview}>
                
                    <input type="text" name="review" placeholder="Share Your Review" className="form-control" onChange={e=>setContent(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>)}
                

                <div className="related mt-5">
                    <div className="related-head d-flex justify-content-center">
                        
                            <h2 style={{fontWeight:"bold"}}><span style={{color:"#383838"}}>RELATED </span>CONTENT</h2> <img src={line} alt="" width={40} height={40} className="mx-2"/>
                        
                    </div>
                    <div className="collection-content row g-5 pt-3">
                        {collections === null ?(
                            <h3>No Related Content</h3>
                        ):(
                            collections.map(collection=>(
                                <CollectionCard _id={collection._id} price={collection.price} name={collection.name} key={collection._id} img={collection.img1??collection.img2??collection.img3??collection.img4} />
                            ))
                        )}
                    
                    </div>
                </div>
            </div>
                </>
               
            ):<h2>Not found</h2>}
            

        </div>
    )
}

export default ProductPage
