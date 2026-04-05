import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { AuthProvider } from "./AuthContext";
import { WSProvider } from "./webSocketContext";
ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <WSProvider>
                <App/>
            </WSProvider>
        </AuthProvider>
        
    </BrowserRouter>
    ,
    document.getElementById("root")
)