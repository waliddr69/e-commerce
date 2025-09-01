import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./models/Collection";

type CardContextType = {
  items:number;
  products:never[];
  id:string;

  setid:React.Dispatch<React.SetStateAction<string>>
  setproducts:React.Dispatch<React.SetStateAction<never[]>>
  setItems: React.Dispatch<React.SetStateAction<number>>;
  total:number;
  setTotal:React.Dispatch<React.SetStateAction<number>>
  refreshItems: () => void;  
  
};

export const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<number>(0);
  const [total,setTotal] = useState<number>(0)
  const [products,setproducts] = useState<never[]>([])
  const [id,setid] = useState("")
  const refreshItems = async()=>{
        const req = await fetch(process.env.REACT_APP_API_CART_URL as string,{
            credentials:"include"
        })

        const res = await req.json()
        if(res.success){
          setid(res.cart._id)
            setproducts(res.cart.products.filter((prod:any)=>prod.isOrdered===false))
            setItems(res.count)
            setTotal(res.subtotal)
        }

    }

  
  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <CardContext.Provider value={{ items,total,products,id,setid,setproducts,setTotal, setItems, refreshItems }}>
      {children}
    </CardContext.Provider>
  );
};