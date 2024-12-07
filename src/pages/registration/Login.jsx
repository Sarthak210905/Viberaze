import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireabase/FirebaseConfig";
import { toast } from "react-toastify";
import myContext from "../../context/data/myContext";

const Login = () => {
  const { loading, setLoading } = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      toast.success("Welcome back!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light"
      });
      
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-00 z-0"
        style={{
          backgroundImage: `url("Untitled design (13).png")`
        }}
      />
      
      <div className="relative z-20 w-full left-60 max-w-lg px-0">
        <form 
          onSubmit={handleLogin} 
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          {/* Logo */}
          <div className="flex justify-center -mb-6 -mt-3">
            <div className="w-40 h-40 flex items-center justify-center ">
              <span className="text-white text-4xl font-bold"><img src="Untitled design (14).png" alt="" /></span>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-7">
            Welcome Back
          </h2>
          
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-3 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
          
          <div className="text-center">
            <Link 
              to="/forgot" 
              className="text-blue-600 hover:text-blue-800 text-sm transition duration-300"
            >
              Forgot Password?
            </Link>
            
            <p className="text-gray-600 mt-4 text-sm">
              Don't have an account? {" "}
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;