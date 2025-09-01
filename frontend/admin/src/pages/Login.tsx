import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthContext";


const Login:React.FC=()=>{
    const [message,setMessage] = useState("")
    const [color,setColor] = useState("red")
    const history = useHistory()
    const auth = useContext(AuthContext)
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formdata = new FormData(form)
        fetch( process.env.REACT_APP_API_USER_URL+"/login",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            credentials:"include",
            body:JSON.stringify({email:formdata.get("email"),pass:formdata.get("pass"),role:"admin"}),

        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                console.log(res)
                setColor("green")
                localStorage.setItem("isAuthenticated","true")
                auth?.refreshUser()
                history.push('/panel')
                
            }else{
                console.log(res.message)
                
            }
            setMessage(res.message)
        }).catch(err=>{console.log(err)})
    }
    return(
        <div className="login">
            <form action="" onSubmit={handleSubmit}>
                <h2 style={{fontWeight:"bold"}}>Admin Panel</h2>
                <p style={{color:color}}>{message}</p>
                <div className="inp-element d-flex">
                   <label htmlFor="email">Email Address</label>
                   <input type="email" name="email" id="email" className="form-control" placeholder="you@email.com" required/> 
                </div>
                <div className="inp-element d-flex">
                   <label htmlFor="pass">Password</label>
                   <input type="password" name="pass" id="pass" className="form-control" placeholder="Enter your password" required/> 
                </div>

                <button type="submit">Login</button>
                
            </form>
        </div>
    )
}

export default Login