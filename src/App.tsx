import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="bg-gray-100">
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
