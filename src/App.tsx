import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="bg-gray-800">
      <Router>
        <Navbar />
        <div className="pt-20 h-screen text-gray-200">
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
