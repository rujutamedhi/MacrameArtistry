import React, { useRef, useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { collection, doc, onSnapshot, updateDoc, addDoc, orderBy, query, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import upload from "../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({ file: null, url: "" });
  
  const { currentUser } = useUserStore(); // Fetch current user info
  const adminId = "admin-id"; // Assign a unique identifier for the admin
  
  const endRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Fetch messages between the current user and the admin
  useEffect(() => {
    const q = query(
      collection(db, "adminChat"),
      orderBy("createdAt", "asc")
    );

    const unSub = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (message) =>
            (message.senderId === currentUser.id && message.receiverId === adminId) ||
            (message.senderId === adminId && message.receiverId === currentUser.id)
        ); // Filter messages
      setChat(messages);
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;
   console.log(currentUser.name)
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await addDoc(collection(db, "adminChat"), {
        senderId: currentUser.id,
  receiverId: adminId,
  text,
  createdAt: new Date(),
  senderName: currentUser.username, // Add sender's name
  ...(imgUrl && { img: imgUrl }),
      });
    } catch (err) {
      console.log(err);
      
    }
   
    setImg({ file: null, url: "" });
    setText("");
  };

  return (
    <div className="chat">
      <h3>Chat with Admin</h3>
      <div className="center">
        {chat.map((message) => (
          <div
            className={message.senderId === currentUser.id ? "message own" : "message"}
            key={message.createdAt}
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="../img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="../camera.png" alt="" />
          <img src="../mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="../emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
