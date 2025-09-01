import { Link, useHistory } from "react-router-dom"
import line from "../assets/minus-horizontal-straight-line.png"
import { useState } from "react"

const Signup:React.FC = ()=>{
    const history = useHistory()
    const [message,setMessage] = useState("")
    const [color,setColor] = useState("")

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const pass = formData.get("pass") as string
        console.log(name,email,pass)
        console.log(formData)
        fetch(process.env.REACT_APP_API_USER_URL as string + "/signup",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({name:name,email:email,pass:pass}),

        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.success){
                console.log(res)
                setColor("green")
                history.push("/login")
                
            }else{
                console.log(res.message)
                setColor("red")
            }
            setMessage(res.message)
        }).catch(err=>{console.log(err)})
    }
    return(
       <form action="" onSubmit={handleSubmit}>
        
        <div className="form-head d-flex justify-content-center">
            <h2 style={{fontWeight:"bold"}}>SignUp</h2><img src={line} alt="" className="mx-2" width={40} height={40}/>
        </div>
        <p style={{color:color,textAlign:"center",fontWeight:"700"}}>{message}{message === "user registered successfully"&&(<Link to={"/login"}>  go to login</Link>)}</p>
        <input type="text" placeholder="Name" name="name" className="rounded p-2" required/>
        <input type="email" placeholder="Email" name="email" className="rounded p-2" required/>
        <input type="password" placeholder="Password" name="pass" className="rounded p-2" required/>

        <div className="d-flex justify-content-end">
            
            <Link to={"/login"} style={{textDecoration:"none",color:"inherit"}}><p>Login Here</p></Link>
        </div>

        <button className="btn" style={{backgroundColor:"black",color:"white",width:"20%",alignSelf:"center"}} type="submit">Sign up</button>
        
    </form> 
    )
    
}

export default Signup