import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    // Basic phone number validation for Indian numbers
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Input validation
    if (!name || !email || !password || !phone) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Phone number validation
    if (!validatePhoneNumber(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Store user data in Firestore
      const userData = {
        name,
        phone,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(fireDB, 'users'), userData);

      // Store user data in localStorage for immediate access
      const userForLocalStorage = {
        name,
        email: userCredential.user.email,
        phone,
        uid: userCredential.user.uid
      };
      localStorage.setItem('user', JSON.stringify(userForLocalStorage));

      // Success notifications and navigation
      toast.success('Sign up successful! Please verify your email.');
      navigate('/');
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
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center relative -mt-10 overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-50 z-0"
        style={{
          backgroundImage: `url("NEW (1).png")`
        }}
      />
      
      <div className="w-250 relative z-20 w-full max-w-lg px-4 sm:px-6 lg:px-8 mx-auto">
        <form 
          onSubmit={handleSignup} 
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
          <h2 className=" text-2xl sm:text-3xl font-extrabold text-center text-gray-800  mb-10">
            Create Your Account
          </h2>
          
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full px-3 py-2 sm:py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          
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

          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number (10 digits)"
              required
              maxLength={10}
              className="w-full px-3 py-2 sm:py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <Phone size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={6}
              className="w-full px-3 py-2 sm:py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 text-sm">
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
    <Footer/>
    </>
  );
};

export default Signup;