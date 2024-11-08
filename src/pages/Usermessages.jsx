// UserMessages.js
import React, { useEffect, useState } from 'react';
import { db } from "../lib/firebase"; // Adjust the import according to your project structure
import { collection,orderBy, query, onSnapshot, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import upload from "../lib/upload";
const UserMessages = () => {
  const { userId } = useParams(); // Get the userId from the URL parameters
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState(""); // State to hold the admin's reply
  const [img, setImg] = useState({ file: null, url: "" });
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
    let imgUrl=null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await addDoc(collection(db, "adminChat"), {
        senderId: "admin-id", // Admin's ID as sender
      receiverId: userId, // Receiver's ID (specific user)
      text: reply,
      createdAt: new Date(), // Consistent timestamp field
      senderName: "admin", // Admin's sender name
      ...(imgUrl && { img: imgUrl }),
      });
      setReply(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
  console.log("****")
for(let mess of messages){
  console.log(mess.img)
}
const handleImg = (e) => {
  if (e.target.files[0]) {
    setImg({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  }
};
  return (
    <div>
      <h3>Messages with {userId}:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.senderName === "admin" ? 'You' : userId}: </strong>
            {message.text && <p>{message.text}</p>}
            {message.img && <img src={message.img} alt="" />}
          </li>
        ))}
      </ul>
      
      {/* Reply textbox and button */}
      <div className="icons">
    <label htmlFor="file">
      <img src="../upload.png" alt="Upload" /> {/* Use a paperclip or image icon here */}
    </label>
    <input
      type="file"
      id="file"
      style={{ display: "none" }}
      onChange={handleImg}
    />
  </div>
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
