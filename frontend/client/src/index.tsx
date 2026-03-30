// index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // includes Popper

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // This wraps the entire app
import App from './App';
import { AuthProvider } from './AuthContext';
import { CardProvider } from './cardContext';
import { WSProvider } from './webSocketContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <WSProvider>
        <CardProvider>
          <App />
        </CardProvider>
      </WSProvider>
      
      
    </AuthProvider>
    
  </Router>,
  document.getElementById('root')
);