import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Input validation
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Store user data in Firestore
      const userData = {
        name,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(fireDB, 'users'), userData);

      // Success notifications and navigation
      toast.success('Sign up successful! Please verify your email.');
      navigate('/login');
    } catch (error) {
      // Error handling
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'Email already exists' 
        : 'Sign up failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-50 z-0"
        style={{
          backgroundImage: `url("Untitled design (13).png")`
        }}
      />
      
      <div className="relative z-20 w-full left-60 max-w-lg px-0">
        <form 
          onSubmit={handleSignup} 
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          {/* Logo */}
          <div className="flex justify-center -mb-6 -mt-3">
            <div className="w-40 h-40 flex items-center justify-center">
              <span className="text-white text-4xl font-bold"><img src="Untitled design (14).png" alt="" /></span>
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-7">
            Create Your Account
          </h2>
          
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full px-3 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
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
          
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="w-full px-3 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mt-4 text-sm">
              Already have an account? {" "}
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;