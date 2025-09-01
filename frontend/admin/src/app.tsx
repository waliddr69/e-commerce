import "./style.css"
import Login from "./pages/Login"
import Panel from "./pages/PanelPage"
import PrivateRoute from "./auth/PrivateRoute"
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
const App:React.FC = ()=>{
    return(
        <Router>
           <div className="app-container">
                <Switch>
                   <Route exact path={"/"} component={Login}/>
                   <Route exact path={"/login"} component={Login}/>
                   <PrivateRoute component={Panel}/>
                </Switch>
                

            </div> 
        </Router>
        
        
    )
}

export default App