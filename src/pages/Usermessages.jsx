// UserMessages.js
import React, { useEffect, useState } from 'react';
import { db } from "../lib/firebase"; // Adjust the import according to your project structure
import { collection, query, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";

const UserMessages = () => {
  const { userId } = useParams(); // Get the userId from the URL parameters
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = () => {
      const q = query(collection(db, "adminChat"));
      onSnapshot(q, (snapshot) => {
        const userMessages = snapshot.docs
          .map(doc => doc.data())
          .filter(
            message =>
              (message.senderName === userId || message.receiverId === userId)
          );
        setMessages(userMessages);
      });
    };

    fetchMessages();
  }, [userId]);

  return (
    <div>
      <h3>Messages with {userId}:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.senderName === userId ? 'You' : userId}: </strong>
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMessages;
