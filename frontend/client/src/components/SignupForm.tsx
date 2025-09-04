import { Link, useHistory } from "react-router-dom"
import line from "../assets/minus-horizontal-straight-line.png"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import google from "../assets/chercher.png"

const Signup: React.FC = () => {
  const history = useHistory()
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("")



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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const pass = formData.get("pass") as string

    fetch(process.env.REACT_APP_API_USER_URL + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, pass }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setColor("green")
          setMessage("User registered successfully!")
          history.push("/login")
        } else {
          setColor("red")
          setMessage(res.message)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-head d-flex justify-content-center">
          <h2 style={{ fontWeight: "bold" }}>SignUp</h2>
          <img src={line} alt="" className="mx-2" width={40} height={40} />
        </div>
        <p style={{ color, textAlign: "center", fontWeight: "700" }}>
          {message}
          {message === "User registered successfully!" && (
            <Link to={"/login"}> go to login</Link>
          )}
        </p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="pass"
          className="rounded p-2"
          required
        />

        <div className="d-flex justify-content-end">
          <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
            <p>Login Here</p>
          </Link>
        </div>

        {/* Google Sign-In button placeholder */}
       

        <button
          className="btn"
          style={{
            backgroundColor: "black",
            color: "white",
            width: "20%",
            alignSelf: "center",
          }}
          type="submit"
        >
          Sign up
        </button>
        <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
            <hr style={{height:"10px",width:"80px"}}/> or <hr style={{height:"10px",width:"80px"}}/>
        </div>
        
      </form>
      
      <button
          type="button"
          className="btn"
          style={{
            border:"black solid 2px",
            color: "black",
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            gap:"10px",
            alignSelf: "center",
          }}
          onClick={handleGoogleSignup}
        >
            <img src={google} alt="" width={20} height={20}/>
          Sign up with Google
        </button>
    </>
  )
}

export default Signup
