import { useEffect, useState } from "react";
import Chart from "../../components/charts/ordersChart";
import { Product } from "../../models/productModel";
import "./analytics.css"
import UsersTable from "../../components/charts/usersTable";
import ProductChart from "../../components/charts/productsChart";

type params = {
    _id:string,

    products:[
        {
            productId:Product,
            quantity:number,
            size:string,
            _id:string,
            
        }
    ],
    fname:string,
    lname:string,
    street:string,
    country:string,
    tel:string,
    userId:{
      _id:string,
      username:string,
      avatar:string
    }
    items:number,
    method:string,
    date:string,
    total:number,
    status:string,
    price:number,
    createdAt: Date
}
const AnalyticsPage: React.FC = () => {
  
  const [data,setData] = useState<Array<{date:string,value:number}>>([])
  const [table,setTable] = useState<Array<{name:string,avatar:string,numOrders:number,products:string[]}>>([])
  const [maxClient,setMaxClient] = useState("")
  const [maxPro,setMaxPro] = useState("")
  const [avatar,setAvatar] = useState("")
  const [products,setProducts] = useState<Array<{name:string,orders:number}>>([])
  const getOrders = async()=>{
    const req = await fetch(process.env.REACT_APP_API_ORDER_URL+"/getAll",{
      credentials:"include"
    })
    const res = await req.json()
    console.log(res)
    
    let ordersMap:Record<string,number> = {}
    const tableMap: Record<string, {
      name: string;
      avatar: string;
      numOrders: number;
      products: string[];
    }> = {};
    const productMap: Record<string, {
      name: string;
      orders:number
    }> = {};
    res.orders.map((r:params)=>{
      const date = new Date(r.createdAt).toISOString().split('T')[0]
      if(ordersMap[date]){
        ordersMap[date]++
      }else{
        ordersMap[date]=1
      }

      const userId = r.userId._id
      if(tableMap[userId]){
        tableMap[userId].numOrders += r.products.length
        tableMap[userId].products.push(...r.products.map(p=>p.productId.name!))

      }else{
        tableMap[userId] = {
          name: r.userId.username,
          avatar: r.userId.avatar,
          numOrders: r.products.length,
          products: r.products.map(p=>p.productId.name!)
        }
      }
      r.products.map(p=>{
        if(productMap[p.productId._id!]){
           productMap[p.productId._id!].orders += 1
           
        }else{
          productMap[p.productId._id!] = {
            name:p.productId.name!,
            orders:1
          }
        }
      })
      
    })
    let max = 0;
    Object.entries(tableMap).forEach(([_key,e])=>{
      if(e.products.length>max){
        max = e.products.length
        setMaxClient(e.name)
        setAvatar(e.avatar)
      }
      setTable(prev=>[...prev,{name:e.name,avatar:e.avatar,numOrders:e.products.length,products:e.products}])
    })
    
    Object.entries(ordersMap).forEach(([key,value])=>{
      const data = { date: key, value: value };
      setData(prev=>[...prev,data])
    })
    let maxPro = 0;
    Object.entries(productMap).forEach(([_key,value])=>{
      if(value.orders>maxPro){
        setMaxPro(value.name)
        maxPro = value.orders
      }
      const data = { name: value.name, orders: value.orders };
      setProducts(prev=>[...prev,data])
    })
    
  }

  useEffect(()=>{
    getOrders()
  },[])
  
  return (
    <div className="form-container " style={{display:"flex",flexDirection:"column", gap:"20px"}}>
      <div className="cards">
        <div className="card">
          <div className="head">
            <div className="ico"><span className="material-symbols-rounded">supervised_user_circle</span></div>
            <h5>Loyal customer</h5>
          </div>
          <div className="body">
            <img src={avatar} alt="avatar" width={50} style={{borderRadius:"50%"}} />
            <h3 style={{margin:0}}>{maxClient}</h3>
          </div>
          

        </div>
        <div className="card">
          <div className="head">
            <div className="ico"><span className="material-symbols-rounded">box</span></div>
            <h5>Best product</h5>
          </div>
          <div className="body">
            
            <h3>{maxPro}</h3>
          </div>
          

        </div>
        
      </div>
      
        
        <h2>Orders chart</h2>
        <Chart data={data}/>
        
        
      
      
      <h2>Customers</h2>
      <UsersTable rows={table}/>
      <h2>Product performance</h2>
      <ProductChart rows={products}/>
    </div>

  );
};

export default AnalyticsPage;
