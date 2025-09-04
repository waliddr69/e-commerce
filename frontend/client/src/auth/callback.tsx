import { useContext, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../AuthContext"
const AuthCallback = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session) {
        console.error("No session found", error)
        return
      }
      console.log(data.session.user)

      


      const req = await fetch(process.env.REACT_APP_API_USER_URL + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization": `Bearer ${data.session.access_token}` },
        body: JSON.stringify({
          way: "supabase",
          
        }),
        credentials:"include"
      })

      const res = await req.json();
      console.log(res)
      if(res.success){
        
            history.push("/home")
        
      }
      auth?.refreshUser()
      
    }

    handleAuth()
  }, [history])

  return <p>Signing you in...</p>
}

export default AuthCallback
