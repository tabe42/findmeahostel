import React from "react";
import {Link} from "react-router-dom"

export const Navbar = ({isAuth,signUserOut}) => {
  return (
<>
        <nav className=" sticky top-0">
          <div className="hidden md:flex flex-col md:flex-row justify-between py-4  px-4 bg-gray-800 text-white text-xl items-center sticky top-0">
            <Link to="/" className="">
              FindMeAHostel
            </Link>
            <div className="flex flex-col md:flex-row md:space-x-10 justify-center items-center">
              <Link to="/products">Browse</Link>
              {!isAuth ? (
                <Link to="/login">Login</Link>
              ) : (
                <>
                  <Link to="/addProduct">Add Product</Link>
                  <Link to="/mylistings">My Listings </Link>
                  <button onClick={signUserOut}>Logout</button>
                </>
              )}
            </div>
          </div>
        </nav>
        
        {/* mobile */}
        <nav className="md:hidden sticky top-0 ">
          <div className="flex flex-row md:flex-row justify-between py-4  px-4 bg-gray-800 text-white text-xs items-center sticky top-0">
            <Link to="/" className="">
              FindMeAHostel
            </Link>
            <div className="flex flex-row md:flex-row md:space-x-10 justify-center items-center">
              <Link to="/products">Browse</Link>
              {!isAuth ? (
                <Link to="/login">Login</Link>
              ) : (
                <>
                  <Link to="/addProduct">Add Product</Link>
                  <button onClick={signUserOut}>Logout</button>
                </>
              )}
            </div>
          </div>
        </nav>
        
        </>
  );
};
