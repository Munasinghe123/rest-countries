import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { loginSuccess } from '../../../Redux/UserSlice';
import {jwtDecode} from 'jwt-decode';
import StarBackground from "../../User/Threejs/StarBackground";


function Login() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { name, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      const token = response.data.token;

      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      const user = decodedToken;

      dispatch(loginSuccess({ user}));

      if(user.role==="user"){
        navigate("/splash");
      }
      
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
    <StarBackground />
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl text-white border border-cyan-400/30 hover:shadow-[0_0_20px_#00c3ff] transition duration-300">

        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Login</h1>
  
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-white/70">Username:</label>
            <input
              type="text"
              id="username"
              value={name}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
  
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-white/70">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
  
          <button
            type="submit"
            className="cursor-pointer w-full mt-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Login;
