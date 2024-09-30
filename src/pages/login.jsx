import React from 'react'
import { useState } from "react";

import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/upload";
import { Link } from 'react-router-dom';
const Login =()=>{
    const [avatar, setAvatar] = useState({
        file: null,
        url: "",
      });
    
      const [loading, setLoading] = useState(false);
    
      const handleAvatar = (e) => {
        if (e.target.files[0]) {
          setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
          });
        }
      };
    const handleLogin = async (e) => {
        console.log("test0")
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
        console.log("test");
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.log("****************")
          console.log(err);
          toast.error(err.message);
        } finally {
          setLoading(false);
          console.log("test3")
        }
    };
        return(
            <div >
            <h2>Welcome back,</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
              />
              <input type="password" placeholder="password" name="password" />
              <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
              <p>Dont have an account?? <Link to={"/register"} >Sign in</Link></p>
            </form>
          </div>
        )
      };

export default Login;