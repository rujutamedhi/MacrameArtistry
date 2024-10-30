import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation after login
  const adminEmail = "rujutamedhi@gmail.com"; // Admin email

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is the admin
      if (user.email === adminEmail) {
        // Store the role in your global state (React Context, Redux, etc.)
        console.log("Logged in as admin");
        // Example: setUserRole("admin");
        navigate("/adminhome"); // Navigate to the admin home page
      } else {
        console.log("Logged in as normal user");
        // Example: setUserRole("user");
        navigate("/userhome"); // Navigate to the user home page
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Welcome back,</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          required
        />
        <input type="password" placeholder="Password" name="password" required />
        <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
