
import { useEffect, useState } from "react"


type params = {img1?:string,img2?:string,img3?:string,img4?:string}

const ProductImg:React.FC<params> = ({img1,img2,img3,img4})=>{
    const [srcMain,setsrc] = useState<string|undefined>(img1)
    
   
    
    const changeimg = (updsrc:string|undefined)=>{
        

        setsrc(updsrc?.replace(`\\`,"/"))
    }
    useEffect(() => {
  setsrc(img1?.replace(`\\`,"/")); 
    }, [img1]);

    

    return(
        <div className="product-imgs">
            <div className="secondary-imgs">
                <img src={img1}alt="" width={40} height={40} onClick={()=>changeimg(img1)}/>
                {img2!=="http://localhost:5000/"+undefined && <img src={img2} alt="" width={40} height={40} onClick={()=>changeimg(img2)} />}
                {img3!=="http://localhost:5000/"+undefined && <img src={img3} alt="" width={40} height={40} onClick={()=>changeimg(img3)} />}
                {img4!=="http://localhost:5000/"+undefined && <img src={img4} alt="" width={40} height={40} onClick={()=>changeimg(img4)} />}
            </div>
    
    <div className="main-img" style={{backgroundImage: srcMain ? `url(${srcMain})` : "none",}}>

            </div>
        </div>
    )
}

export default ProductImg