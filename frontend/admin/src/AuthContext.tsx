import React, { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  loading:boolean,
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
  name: string | null;
  avatar: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
  refreshUser: () => void;  
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading,setLoading] = useState(false)
  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const refreshUser = async() => {
    try{
    const req = await fetch(process.env.REACT_APP_API_USER_URL + "/me", {
      credentials: "include",
    })
      const res = await req.json()
      
        if (res.success) {
          setName(res.name);
          setAvatar(res.avatar);
        } else {
          setName(null);
          setAvatar(null);
        }
     }catch(e){
      console.log(e)
     }finally{
      setLoading(true)

     }
      
      
  };


  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ name, avatar,loading,setLoading, setName, setAvatar, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
