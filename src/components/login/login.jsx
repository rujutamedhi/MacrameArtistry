// Code by Utsav Patel
// Login using clerk
import { useState } from "react";
import "../login/login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
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

  // to handle request for "form register"
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(false);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);
      console.log("Image uploaded successfully, URL:", imgUrl);
      
      // First Firestore write
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          username,
          email,
          avatar: imgUrl,
          id: res.user.uid,
          blocked: [],
        });
        console.log("test1");
      } catch (err) {
        console.log("Error setting user document:", err);
        throw err; // Rethrow to catch in the outer block
      }
  
      // Second Firestore write
      try {
        await setDoc(doc(db, "userchats", res.user.uid), {
          chats: [],
        });
        console.log("test2");
      } catch (err) {
        console.log("Error setting userchats document:", err);
        throw err; // Rethrow to catch in the outer block
      }
  
      toast.success("Account created! You can login now!");
      console.log("Success toast fired");
    } catch (err) {
      console.log("***************");
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="login">
      <div className="item">
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
        </form>
      </div>
      <div className="serparator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "../avatar.png"} alt="" className="src" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
