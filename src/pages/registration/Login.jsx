import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../fireabase/FirebaseConfig"; // Fixed import path
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader"; // Add this import

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading, setUser } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(loading);
    }
  };
  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      setUser(result.user); // Update user in context
      navigate("/"); // Ensure redirection to home page
      setLoading(false); // Ensure loading is set to false after successful login
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={login}
            className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={googleLogin}
            className=" bg-blue-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Login with Google
          </button>
        </div>
        <div className=" text-white">
          <Link className=" text-yellow-500 font-bold" to={"/forgot"}>
            Forgot Password?
          </Link>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
