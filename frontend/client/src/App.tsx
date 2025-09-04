import React, { useContext, useEffect, useState } from "react"
import logo from "./assets/forever.png";
import { Link } from "react-router-dom";
import search from "./assets/search.png";
import user from "./assets/user.png";
import cart from "./assets/shopping-bag.png";
import { BrowserRouter as Router,Route,Switch, NavLink,Redirect  } from "react-router-dom";
import Collectionpage from "./pages/Collectionpage";
import Homepage from "./pages/Homepage";
import AboutusPage from "./pages/AboutusPage";
import Contactpage from "./pages/Contactpage";
import ProductPage from "./pages/ProductPage";
import close from "./assets/close(1).png";
import LoginPage from "./pages/LoginPage";
import { AuthContext, AuthProvider } from "./AuthContext";
import Cart from "./pages/CartPage";
import SignPage from "./pages/SignupPage";
import PaymentPage from "./pages/PaymentPage";
import NotFoundPage from "./pages/notFoundPage";
import SearchPage from "./pages/searchPage";
import PayementForm from "./components/payementForm";
import "./style.css"
import { CardContext } from "./cardContext";
import "./pages/collection.css"
import { useHistory } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PrivateRoute from "./auth/PrivateRoute";
import AuthCallback from "./auth/callback";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

const App:React.FC = ()=>{
    const auth = useContext(AuthContext)
    const card = useContext(CardContext)
    const [inp,setInp] = useState("")
    const [change,setChange] = useState<string[]>(["search your favorite clothes"])
    const [suggestions,setSuggestions] = useState<string[]>(JSON.parse(localStorage.getItem("lastSearches")||"[]"))
    
    const [searchDis,setSearch] = useState(false)
    const history = useHistory()
    const displaySearch = ()=>{
        
        const search = searchDis ? false:true
        setSearch(search)
        
    }

    const handleSearch = (e:React.FormEvent | null,customValue?:string)=>{
        e?.preventDefault()
        const value = customValue||inp
        
        
        
        if(inp!==""){
            history.push("/search?q="+encodeURIComponent(value||""))
            setSearch(false)
            setChange(["search your favorite clothes"])
            if(auth?.avatar !== null){
            const previousSearches = JSON.parse(localStorage.getItem("lastSearches")||"[]");
        const searchSet = new Set([value,...previousSearches]) ;
        const updatedSearches = Array.from(searchSet).slice(0,5);
        setSuggestions(updatedSearches)
        localStorage.setItem("lastSearches",JSON.stringify(updatedSearches))
        }}

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    console.log(value);
    setInp(value); 

    if (value === "") {
        setChange([])
        return;
    }

    fetch(`${process.env.REACT_APP_API_PRODUCT_URL}/search?q=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(res => {
            if(res.search.length>0){
            
            const names = res.search.map((search: { name: string }) => search.name).slice(0,4);
            setChange(names);
            console.log(names);}
            else{
                setChange([])
            }
        })
        .catch(err => {
            console.error("Search failed:", err);
        });
};

useEffect(() => {
    if (searchDis) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        const root = document.getElementById("root");
        if(root){
            root.style.overflow = "hidden"
        }
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        const root = document.getElementById("root");
        if(root){
            root.style.overflow = ""
        }
    }
}, [searchDis]);


    
const handleLogout = async()=>{
    const req = await fetch(process.env.REACT_APP_API_USER_URL+"/logout",{
        credentials:"include"
    })

    const res = await req.json()
    if(res.success){
        auth?.refreshUser();
        history.push("/")
    }


}
    

   console.log(auth?.avatar) 

    


    
    return(
        <>
        
        <div className="app-container">
            <header>
                <div className="header-wrapper">
                    <div className="logo">
                        <img src={logo} alt="forever" width={120} height={120}/>
                    </div>
                    <nav>
                    <div className="nav-wrapper">
                        <ul>
                            <li><NavLink to={"/home"} activeClassName="active" >
                                HOME
                            </NavLink>
                                </li>
                            <li><NavLink to={"/collection"} activeClassName="active"  >
                                COLLECTION
                            </NavLink></li>
                            <li><NavLink to={"/about"} activeClassName="active" >ABOUT</NavLink></li>
                            <li><NavLink to={"/contact"} activeClassName="active" >CONTACT</NavLink></li>
                            
                            
                        </ul>
                    </div>
                    </nav>
                    <div className="user-icons">
                    <div className="icon-wrapper">
                        <img src={search} alt="search" width={30} height={30} onClick={displaySearch}/>
                    </div>
                    <div className="icon-wrapper-user">
                        {auth?.avatar === null?(
                            <Link to={"/login"}><img src={user} alt="account" width={30} height={30} /></Link>
                        ):(
                            <><img src={auth?.avatar} alt="" width={40} height={40} style={{ borderRadius: "50%" }} className="user-avatar" />
                                <div className="triangle"></div>
                                <div className="logout" onClick={handleLogout}>
                                    
                                    <span className="material-symbols-rounded" style={{color:"black"}}>logout</span>
                                    <p>Logout</p>
                                </div>

                            
                                        </>
                        )}
                        
                    </div>
                    <div className="icon-wrapper">
                        {auth?.avatar !== null&&(
                            <><Link to={"/cart"}><img src={cart} alt="cart" width={30} height={30} /></Link><p>{card?.items}</p></>
                        )}
                        
                    </div>
                    </div>
                </div>
                
                {searchDis &&(
                    <div className="search-bar">
                    <hr style={{width:"100%",padding:"0",margin:"0"}} />
                    <div className="search-wrapper">
                       <form action="" className="input-group" onSubmit={handleSearch}>
                            <input type="search" placeholder="Search" name="search" className="form-control" onChange={handleChange} defaultValue={""}/>
                            <div className="input-group-prepend">
                                <button  className="input-group-text border-none" type="submit"><img src={search} alt="" width={25} height={25}/></button>
                            </div>
                            <button style={{border:"none",marginLeft:"8px"}} onClick={displaySearch}><img src={close} alt="" width={25} height={25}/></button>
                        </form>

                        <div className="suggestions">
                            <div className="suggestions-wrapper px-3 pt-3 pb-1" style={{width:"50%",backgroundColor:"white",marginLeft:"250px",borderRadius:"6px"}}>
                                {change.length>0?(
                                    change.includes("search your favorite clothes") ? (<p style={{fontWeight:"500"}}>search your favorite clothes</p>):
                                    (change.map((item,index) =>
                                        
                                         (
                                            <React.Fragment key={item}>
                                                <div
                                                    style={{ cursor: "pointer", gap: "16px" }}
                                                    onClick={()=>{handleSearch(null,item)}}
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="material-symbols-rounded" style={{ color: "black" }}>apparel</span> {item}
                                                </div>
                                                <hr />
                                            </React.Fragment>
                                        )
                                    ))
                                ):(
                                    <p>No results yet...</p>
                                )}
                                {suggestions.length > 0 && (
                                    <>
                                        <p style={{color:"gray"}}>Searched recently</p>
                                        {suggestions.map((item) => (
                                            <React.Fragment key={item}>
                                                <div
                                                    style={{ cursor: "pointer", gap: "16px" }}
                                                    onClick={() => { handleSearch(null, item) }}
                                                    className="d-flex align-items-center"
                                                >
                                                    <span className="material-symbols-rounded" style={{ color: "black" }}>history</span> {item}
                                                </div>
                                                <hr />
                                            </React.Fragment>
                                        ))}
                                    </>
                                )}
                                
                            </div>
                        </div>
                         
                    </div>
                    
                </div>
                )}
                
            </header>
            <hr style={{width:"80%",padding:"0",margin:"0"}} />

            <Switch>
                <Route exact path={"/"} component={Homepage}/>
                <Route exact path={"/home"} component={Homepage}/>
                <Route exact path={"/collection"} component={Collectionpage}/>
                <Route exact path={"/auth/callback"} component={AuthCallback}/>
                <Route exact path={"/about"} component={AboutusPage}/>
                <Route exact path={"/contact"} component={Contactpage}/>
                <Route exact path="/login" render={() => (
                    !auth?.loading ? <p>Loading...</p> :
                    auth?.avatar ? <Redirect to="/" /> : <LoginPage />
                    )} />

                <Route exact path="/signup" render={() => (
                    !auth?.loading ? <p>Loading...</p> :
                    auth?.avatar ? <Redirect to="/" /> : <SignPage />
                )} />
                <PrivateRoute exact path={"/cart"} component={Cart} auth={{loading:auth?.loading,avatar:auth?.avatar}}/>
                <PrivateRoute exact path={"/pay"} auth={{ loading: auth?.loading, avatar: auth?.avatar }}  component={PaymentWrapper}/>
                
               
                <Route exact path={"/product/:id"} component={ProductPage} />
                
                    
                
                

                
                
                
                
                <Route exact path={"/search"} component={SearchPage}/>
                <Route component={NotFoundPage}/>
            </Switch>

            
            <hr style={{width:"80%"}}/>
            <footer>
                <div className="footer-wrapper">
                    <div className="footer-content">
                        <img src={logo} alt="" width={120} height={120}/>
                        <p style={{color:"#838383"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum vero fugiat magnam atque doloremque rem asperiores laudantium i
                            ure, dolor reprehenderit odit quaerat iusto eveniet officiis maiores placeat, cumque quia. Architecto?</p>
                    </div>

                    <div className="fotter-company">
                        <h2 style={{fontWeight:"bold"}}>Company</h2>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h2 style={{fontWeight:"bold"}}>Get In touch</h2>
                        <pre style={{color:"#838383"}}>+213 0798492604

                        waliddari69@gmail.com
                        </pre>
                    </div>
                
                </div>
            </footer>
        </div>
          

        </>
        
    )
}

export default App