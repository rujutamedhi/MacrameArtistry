import { useEffect } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();
  console.log("current user");
  console.log(currentUser);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, print user info
        console.log("User logged in:", user);
        fetchUserInfo(user.uid);
      } else {
        console.log("No user is authenticated");
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // if (isLoading) return <div className="loading">Hayyyy Rama...</div>;

  return (
    <div className="container">
      <h3>Current User: {currentUser ? currentUser.name : "Guest"}</h3>

      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
