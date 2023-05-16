import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={register}
        className="bg-gray-500 p-8 rounded shadow-md space-y-4 mt-32"
      >
        <h2 className="text-2xl font-bold">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-gray-800 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-gray-800 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
        <p>
          Do you have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
