import React from 'react';
import chat from "../images/chat1.png";
import login from "../images/login.png";
import logoutIcon from "../images/logout.png"; // Add a logout icon if available
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from "../lib/userStore"; // Import the user store

export default function Navbar() {
  const { currentUser, setCurrentUser } = useUserStore(); // Get currentUser and setCurrentUser to handle login/logout
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

  const handleLogout = () => {
    // Clear the user from the store and navigate to login
    setCurrentUser(null);
    alert('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className='navbar'>
      {/* Handle the click on the chat image */}
      <img className='chat' src={chat} alt="Chat" onClick={handleChatClick} />

      {/* Conditionally render the login or logout button based on the user's login status */}
      {currentUser ? (
        // Show the logout button if the user is logged in
        <img 
          className='logout' 
          src={logoutIcon} // You can use a different icon for logout or just a text button
          alt="Logout"
          onClick={handleLogout}
        />
      ) : (
        // Show the login button if the user is not logged in
        <Link to="/login">
          <img className='login' src={login} alt="Login" />
        </Link>
      )}
    </div>
  );
}
