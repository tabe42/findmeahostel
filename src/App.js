import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar"
import { Landing } from "./pages/Landing";
import { Listings } from "./pages/Listings";
import { AddProperty } from "./pages/AddProperty";
import { Login } from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import {Register} from "./pages/Register"
import {Mappage} from "./pages/Mappage"
import ChatRoom from "./pages/ChatRoom";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <BrowserRouter>
    <div className="font-mono flex flex-col justify-center bg-gradient-to-tr from-yellow-400 to-yellow-300">

      <Navbar isAuth={isAuth} signUserOut={signUserOut}/>
      </div>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Listings isAuth={isAuth} />} />
          <Route path="/addproduct" element={<AddProperty isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
          <Route path="/map" element={<Mappage isAuth={isAuth} />} />
          <Route path="/chatroom" element={<ChatRoom isAuth={isAuth} />} />
        </Routes>
     
    </BrowserRouter>

  );
}

export default App;
