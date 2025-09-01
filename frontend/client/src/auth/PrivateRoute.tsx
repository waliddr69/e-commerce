import { Route, Redirect } from "react-router-dom";

import { RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    auth: {
        loading: boolean|undefined;
        avatar?: string|undefined|null;
    };
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, auth, ...rest }) => {
    return(
        <Route
        {...rest}
        render={props=>{
            if(!auth.loading) return <p>Loading...</p>
            if(!auth.avatar) return <Redirect to={"/login"}/>
            return <Component{...props}/>;
        }}
        />
    )
}

export default PrivateRoute;