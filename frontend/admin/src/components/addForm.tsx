import React, { useEffect } from "react";
import { useState } from "react";

const AddForm: React.FC = () => {


  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  });

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (e.target.checked) {
    setSize(prev => [...prev, value]);
  } else {
    setSize(prev => prev.filter(s => s !== value));
  }
};

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("Men")
  const [subcategory,setSub] = useState("Topwear")
  const [price,setPrice] = useState<number>(0)
  const [size,setSize] = useState<string[]>([])
  const [bestSeller,setSeller] = useState<boolean>(false)
  const [responseMess,setResponse] = useState<string>("")
  const [style,setStyle] = useState<string>("")
  const [id,setId] = useState<string>("")
      useEffect(() => {
    if (responseMess !== "") {
      // Reset class to visible each time
      setId("message");

      const timer = setTimeout(() => {
        setId("message inactive"); // add fade-out class
        // If you want it fully disappear, clear message after fade
        setTimeout(() => setResponse(""), 500); // match CSS transition duration
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [responseMess]);

   

  

  const HandleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form = e.currentTarget

    const formData = new FormData();

  // Append text fields
  formData.append("name", name);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("subCategory", subcategory);
  formData.append("price", price.toString());
  formData.append("bestseller", bestSeller.toString());
  size.forEach((s) => formData.append("sizes[]", s));

    // Files
  ["img1", "img2", "img3", "img4"].forEach((key) => {
  const input = document.getElementById(key) as HTMLInputElement;
  if (input?.files?.[0]) {
      formData.append(key, input.files[0]);
  }
    formData.forEach((value, key) => {
  console.log(key, value);
});





    });
    try{
      const req = await fetch("http://localhost:5000/v1/api/products/add",{
        method:"POST",
        body:formData
      })

      const res = await req.json();
      console.log("Full response:", res);

      if(res.success){
        console.log("added")
        setStyle("green")
        form.reset()
      }else{
        console.log("not added")
        console.log(res.body)
        setStyle("red")
      }
      setResponse(res.body)
    }catch(e){
      console.log("error")
      setResponse("internal server error")
      setStyle("red")
    }
      

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviews(prev => ({
        ...prev,
        [key]: URL.createObjectURL(file),
      }));
    }
  };



  return (
    <>
    {responseMess !== ""&&(
      <p style={{color:style}} className={id}>{responseMess}</p>
    )}
        
    <form action="" encType="multipart/form-data" onSubmit={HandleSubmit}>
      <p>Upload Images</p>
      <div className="row labels">
  {["img1", "img2", "img3", "img4"].map((id) => (
    <div className="upload-box col-2 " key={id}>
      <label htmlFor={id} className="upload-label">
        {previews[id] ? (
          <img src={previews[id]!} alt="preview" className="preview" />
        ) : (
          <>
            <span className="material-symbols-rounded">upload</span>
            <p>Upload</p>
          </>
        )}
      </label>
      <input
        type="file"
        name={id}
        id={id}
        onChange={(e) => handleFileChange(e, id)}
        style={{ display: "none" }}
        accept="image/*"
      />
    </div>
  ))}
</div>


      
    <div>
       <p>Product Name</p>
      <input type="text" placeholder="Type here" name="name" className="form-control" required onChange={e=>setName(e.target.value)}/> 
    </div>
      <div>
        <p>Product description</p>
      <textarea name="description" placeholder="Write content here" className="form-control" required onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription(e.target.value)}></textarea>
      </div>
      

      <div className="product-info">
        <div className="category">
            <p>Product category</p>
            <select className="form-control" name="category" required onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setCategory(e.target.value);console.log(e.target.value)}}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        <div className="subcategory">
            <p>Sub category</p>
            <select className="form-control" name="subcategory" id="" required onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setSub(e.target.value)}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>
        </div>
        <div className="price" >
            <p>Product price</p>
            <input className="form-control" type="number" step={0.01} name="price" required onChange={e=>setPrice(parseFloat(e.target.value))}/>
        </div>
        
      </div>
      <div className="sizes">
        <input type="checkbox" name="size-s" id="size-s" value={"S"} checked={size.includes("S")} onChange={handleSizeChange}/>
        <label htmlFor="size-s">S</label>
        <input type="checkbox" name="size-m" id="size-m" value={"M"} checked={size.includes("M")} onChange={handleSizeChange}/>
        <label htmlFor="size-m">M</label>
        <input type="checkbox" name="size-l" id="size-l" value={"L"} checked={size.includes("L")} onChange={handleSizeChange}/>
        <label htmlFor="size-l">L</label>
        <input type="checkbox" name="size-xl" id="size-xl" value={"XL"} checked={size.includes("XL")} onChange={handleSizeChange}/>
        <label htmlFor="size-xl">XL</label>
        <input type="checkbox" name="size-xxl" id="size-xxl" value={"XXL"} checked={size.includes("XXL")} onChange={handleSizeChange}/>
        <label htmlFor="size-xxl">XXL</label>
       </div>
       <div className="bestseller">
            <input type="checkbox" name="bestseller" checked={bestSeller}  onChange={(e)=>setSeller(e.target.checked)}/><label htmlFor="">Add to bestseller</label>
       </div>
        
        <button type="submit">ADD</button>
    </form>
    </>

  );
};

export default AddForm;
