import React from 'react';
import chat from "../images/chat1.png";
import login from "../images/login.png";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from "../lib/userStore"; // Import the user store to check if the user is logged in

export default function Navbar() {
  const { currentUser } = useUserStore(); // Get the current user from the user store
  const navigate = useNavigate(); // Use navigate to programmatically change the route

  const handleChatClick = () => {
    if (currentUser) {
      // User is logged in, navigate to the chat page
      navigate('/chat');
    } else {
      // User is not logged in, show alert and navigate to login page
      alert('Please log in first to access the chat.');
      navigate('/login');
    }
  };

  return (
    <div className='navbar'>
      {/* Handle the click on the chat image */}
      <img className='chat' src={chat} alt="Chat" onClick={handleChatClick} />
      {/* Link to the login page */}
      <Link to="/login">
        <img className='login' src={login} alt="Login" />
      </Link>
    </div>
  );
}
