import React from "react";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-3xl font-bold mb-4">Log in or create an account</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to="/login"
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded text-center"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-400 text-white font-bold py-2 px-4 rounded text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default NotLoggedIn;
