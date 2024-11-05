// UserMessages.js
import React, { useEffect, useState } from 'react';
import { db } from "../lib/firebase"; // Adjust the import according to your project structure
import { collection,orderBy, query, onSnapshot, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const UserMessages = () => {
  const { userId } = useParams(); // Get the userId from the URL parameters
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState(""); // State to hold the admin's reply

  useEffect(() => {
    const fetchMessages = () => {
      const q = query(collection(db, "adminChat"));
      orderBy("timestamp", "asc")
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

  const handleSendReply = async () => {
    if (reply.trim() === "") return; // Prevent sending empty messages

    try {
      await addDoc(collection(db, "adminChat"), {
        senderId: "admin-id", // Admin's ID as sender
      receiverId: userId, // Receiver's ID (specific user)
      text: reply,
      createdAt: new Date(), // Consistent timestamp field
      senderName: "admin", // Admin's sender name
      });
      setReply(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div>
      <h3>Messages with {userId}:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.senderName === "admin" ? 'You' : userId}: </strong>
            {message.text}
          </li>
        ))}
      </ul>
      
      {/* Reply textbox and button */}
      <div>
        <input
          type="text"
          placeholder="Type your reply here..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <button onClick={handleSendReply}>Send</button>
      </div>
    </div>
  );
};

export default UserMessages;
