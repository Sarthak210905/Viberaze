import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";
import myContext from "../../context/data/myContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

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
      
      // Fetch user data from Firestore to get phone number
      const usersRef = collection(fireDB, 'users');
      const q = query(usersRef, where("uid", "==", result.user.uid));
      const querySnapshot = await getDocs(q);
      
      let userData = {
        name: result.user.displayName || result.user.email.split('@')[0],
        email: result.user.email,
        uid: result.user.uid,
        phone: ''
      };
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        userData = {
          ...userData,
          name: userDoc.name || userData.name,
          phone: userDoc.phone || ''
        };
      }
      
      toast.success("Welcome back!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light"
      });
      
      localStorage.setItem("user", JSON.stringify(userData));
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
    <>
    <Navbar />
    <div className="min-h-screen flex items-center -mt-10 justify-center relative overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-50 z-0"
        style={{
          backgroundImage: `url("NEW (1).png")`
        }}
      />
      
      <div className="w-250 relative z-20 w-full max-w-lg px-4 sm:px-6 lg:px-8 mx-auto">
        <form 
          onSubmit={handleLogin} 
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl px-6 sm:px-8 pt-6 pb-8 mb-4 w-full space-y-4"
          
        >
          {/* Logo */}
          <div className="flex justify-center -mb-10">
            <img 
              src="Untitled design (14).png" 
              alt="Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-3 py-2 sm:py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-2 sm:py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
          
          <div className="text-center space-y-4">
            <Link 
              to="/forgot" 
              className="text-blue-600 hover:text-blue-800 text-sm transition duration-300 block"
            >
              Forgot Password?
            </Link>
            
            <p className="text-gray-600 text-sm">
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
    <Footer />
    </>
  );
};

export default Login;