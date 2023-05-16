import React from "react";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div>
      <h1>You are not logged in</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default NotLoggedIn;
