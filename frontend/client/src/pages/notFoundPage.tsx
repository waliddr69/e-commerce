import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px",padding:"25px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to={"/home"}>Back to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
