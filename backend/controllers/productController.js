const asyncHandler = require("express-async-handler")

const Product = require("../models/productModel")



const getProducts = asyncHandler(async(req,res)=>{
  const {limit} = req.query
  let products = null;
  if(limit){
     products = await Product.find().limit(limit)
  }else{
     products = await Product.find()
  }
  
  if(products){
    
    res.status(200).json({success:true,products})
  }else{
    res.json({success:false,body:"no collections"})
  }
})
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, category, subCategory, price, sizes, bestseller, Reviews } = req.body;

  // Validate required fields
  if (
    !name ||
    !description ||
    !category ||
    !subCategory ||
    !price ||
    !sizes ||
    sizes.length === 0 
    
  ) {
    return res.status(400).json({
      success: false,
      body: "All fields are mandatory",
    });
  }

  if(!req.files["img1"] && !req.files["img2"] && !req.files["img3"] && !req.files["img4"]){
    return res.status(400).json({
      success:false,
      body:"At least one image should be added"
    })
  }

  // Create product
  const product = await Product.create({
    name,
    description,
    category,
    subCategory,
    price,
    sizes,
    bestseller,
    img1: req.files["img1"] ? req.files["img1"][0].path : null,
    img2: req.files["img2"] ? req.files["img2"][0].path : null,
    img3: req.files["img3"] ? req.files["img3"][0].path : null,
    img4: req.files["img4"] ? req.files["img4"][0].path : null,
    Reviews,
  });

  res.status(201).json({
    success: true,
    product,
    body: "Product added successfully",
  });
});

const deleteProduct = asyncHandler(async(req,res)=>{
  
  const deleted = await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({success:true,deleted,id:req.params.id})
})

const getLatest = asyncHandler(async(req,res)=>{
  const product = await Product.find().sort({createdAt:-1}).limit(10)
  if(product){
    res.status(200).json({success:true,product})
  }else{
    res.status(404);
    throw new Error("page not found")
  }
  

})

const getBestSeller = asyncHandler(async(req,res)=>{
  const product = await Product.find({bestseller:true})
  if(product){
    res.status(200).json({success:true,product})
  }else{
    res.status(404).json({success:false})
    
    
  }
  
})

const handleFilter = asyncHandler(async (req, res) => {
  try {
    const { category, sub,priceSort } = req.body.data;
    const {limit} = req.query

    // Remove empty values
    const searchCat = category.filter(c => c !== "");
    const searchSub = sub.filter(s => s !== "");

    // Build query object
    const query = {};
    if (searchCat.length > 0) {
      query.category = { $in: searchCat };
    }
    if (searchSub.length > 0) {
      query.subCategory = { $in: searchSub };
    }
        let sort = {};
    if (priceSort === 1) {
      sort = { price: 1 }; // ascending
    } else if (priceSort === -1) {
      sort = { price: -1 }; // descending
    }


    // Run the query
    const product = await Product.find(query).sort(sort).limit(limit);

    if (product.length > 0) {
      
      res.status(200).json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: "No products found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const handleSearch = asyncHandler(async(req,res)=>{
  const q = req.query.q
  console.log(q)
  const search = await Product.find({name:{$regex:q,$options:"i"}})
  res.status(200).json({search})
})

const getProduct = asyncHandler(async(req,res)=>{
  const id = req.params.id
  const product = await Product.findById(id)
  res.json({product})
})

const getRealted = asyncHandler(async(req,res)=>{
  const {category,sub,execludeId} = req.query
  const product = await Product.find({category:category,subCategory:sub,_id:{$ne:execludeId}}).limit(6)
  
  res.json({success:true,product})
})



module.exports = {addProduct,getProducts,deleteProduct,getLatest,getBestSeller,handleFilter,handleSearch,getProduct,getRealted}