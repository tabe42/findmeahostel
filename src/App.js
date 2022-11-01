import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar"
import { Landing } from "./pages/Landing";
import { Products } from "./pages/Products";
import { AddProduct } from "./pages/AddProduct";
import { Login } from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { MyProducts } from "./pages/MyProducts";
import { MyListings } from "./pages/MyListings";
import {Register} from "./pages/Register"
import {Mappage} from "./pages/Mappage"

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
          <Route path="/products" element={<Products isAuth={isAuth} />} />
          <Route path="/addproduct" element={<AddProduct isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
          <Route path="/mylistings" element={<MyListings isAuth={isAuth} />} />
          <Route path="/map" element={<Mappage isAuth={isAuth} />} />
        </Routes>
     
    </BrowserRouter>

  );
}

export default App;
