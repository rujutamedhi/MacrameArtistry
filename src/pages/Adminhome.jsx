import React, { useEffect, useState } from 'react';
import { db } from "../lib/firebase"; // Adjust the import according to your project structure
import { collection, query, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Adminhome() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook

  // Fetch unique users who have sent messages
  useEffect(() => {
    const fetchUsers = () => {
      const q = query(collection(db, "adminChat"));
      onSnapshot(q, (snapshot) => {
        const usersSet = new Set(); // Using Set to avoid duplicates
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.senderName) {
            usersSet.add(data.senderName);
          }
        });
        setUsers(Array.from(usersSet)); // Convert Set to Array
      });
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/messages/${userId}`); // Navigate to UserMessages with userId
  };

  return (
    <div>
      <h2>Messages</h2>
      <h3>Users:</h3>
      <ul>
        {users.map(userId => (
          <li key={userId} onClick={() => handleUserClick(userId)} style={{ cursor: 'pointer', color: 'blue' }}>
            {userId} {/* You might want to replace this with a more user-friendly name */}
          </li>
        ))}
      </ul>
    </div>
  );
}
