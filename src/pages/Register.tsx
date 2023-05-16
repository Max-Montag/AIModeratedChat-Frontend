import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/register/`, {
        username,
        password,
      });
      navigate("/login");
      alert("Registration Successful");
    } catch (error) {
      setError("Failed to register");
    }
  };

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
