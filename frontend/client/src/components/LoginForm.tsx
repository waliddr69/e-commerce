import { Link, useHistory } from "react-router-dom"
import line from "../assets/minus-horizontal-straight-line.png"
import { useContext, useState } from "react"
import { AuthContext } from "../AuthContext"
import { supabase } from "../supabaseClient"
import google from "../assets/chercher.png"
const Login:React.FC = ()=>{
    const [message,setMessage] = useState("")
    const [style,setStyle] = useState("")
    const history = useHistory()
    const auth = useContext(AuthContext)

    const handleGoogleSignup = async() => {
        const{error,data} = await supabase.auth.signInWithOAuth({
            provider:"google",
            options: {
        queryParams: {
          prompt: "select_account",
        },
        redirectTo: "http://localhost:3000/auth/callback", 
      },
        })
         
        
      }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        const form = e.currentTarget
        const formData = new FormData(form)
        const email = formData.get("email") as string
        const pass = formData.get("pass") as string

        fetch(process.env.REACT_APP_API_USER_URL as string + "/login",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({email:email,pass:pass,role:"user"}),
            credentials:"include"
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.success){
                setStyle("green")
                auth?.refreshUser()
                history.push("/home")
            }else{
                setStyle("red")
            }
            setMessage(res.message)

        })
    }
    return(
       <><form action="" onSubmit={handleSubmit}>

            <div className="form-head d-flex justify-content-center">
                <h2 style={{ fontWeight: "bold" }}>Login</h2><img src={line} alt="" className="mx-2" width={40} height={40} />
            </div>
            <p style={{ color: style, fontWeight: "700", textAlign: "center" }}>{message} {message === "user logged in successfully" && (<Link to={"/home"}> got to Homepage</Link>)}</p>
            <input type="email" placeholder="Email" name="email" className="rounded p-2" />
            <input type="password" placeholder="Password" name="pass" className="rounded p-2" />

            <div className="d-flex justify-content-between">
                <p>Forgot your password?</p>
                <Link to={"/signup"} style={{ textDecoration: "none", color: "inherit" }}><p>Create account</p></Link>
            </div>

            <button className="btn" style={{ backgroundColor: "black", color: "white", width: "20%", alignSelf: "center" }} type="submit">Sign in</button>
            <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
            <hr style={{height:"10px",width:"80px"}}/> or <hr style={{height:"10px",width:"80px"}}/>
        </div>
        </form><button
            type="button"
            className="btn"
            style={{
                border: "black solid 2px",
                color: "black",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                alignSelf: "center",
            }}
            onClick={handleGoogleSignup}
        >
                <img src={google} alt="" width={20} height={20} />
                Login in with Google
            </button></>
    )
    
}

export default Login