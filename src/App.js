import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Name from './components/name';
import Home from './pages/home';
import Items from './pages/items';
import Register from './pages/register';
import Login from './pages/login';
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Chat from './pages/chat';
import Adminhome from './pages/Adminhome';
import UserMessages from './pages/Usermessages';
function App() {
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
  return (
    
    <Router> {/* Wrap everything inside Router */}
    <Navbar />
      <div className="App">
        {/* <h3>{currentUser.username}</h3> */}
        <Name /> {/* Render your Name component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/items' element={<Items/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/chat' element={<Chat/>}/>
<Route path='/adminhome' element={<Adminhome/>}/>
<Route path="/messages/:userId" element={<UserMessages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
