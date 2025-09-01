import { Component } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps{
    component:React.ComponentType<any>
}
const PrivateRoute:React.FC<PrivateRouteProps>=({component:Component,...rest})=>{
    const auth = localStorage.getItem("isAuthenticated");
    return(
        <Route
        {...rest}
        render={props=>
            auth ? <Component {...props}/>:<Redirect to={"/login"}/>
        }
        />
    )

}

export default PrivateRoute