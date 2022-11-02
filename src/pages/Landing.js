import React from "react";
import { Link } from "react-router-dom";
import box from "../images/croppedbox.gif";
import Typed from "react-typed";

export const Landing = () => {
  return (
    // <div className="max-w-[800px] md:h-screen md:mt-[-50px] w-full mx-auto justify-center flex flex-col text-black mt-4">
    //   <div className="flex flex-col items-center md:flex-row md:space-x-10">
    //     <img className="w-1/2 md:w-1/3 md:h-full  " src={box} alt="box" />
    //     <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
    //       <p className="text-3xl md:text-6xl">MecMarketplace</p>
    //       <div className="flex text-3xl ">
    //         <p>One stop shop to</p>
    //         <Typed
    //           className="pl-2 text-blue-600"
    //           strings={["buy", "sell", "trade"]}
    //           typeSpeed={100}
    //           backSpeed={100}
    //           loop
    //         />
    //       </div>
    //       <p className="text-3xl">For MECians</p>
    //       <Link to="/products">
    //         <button className="bg-blue-600 px-4 py-2 text-white self-start rounded-lg hover:bg-blue-500">
    //           Browse the shop
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center pb-36">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="text-2xl py-6 ">Welcome to Find Me A Hostel</p>
        <Link to="/register">
          <button className="bg-blue-600 px-4 py-2 text-white self-start rounded-lg hover:bg-blue-500">Click to get started</button>
        </Link>
      </div>
    </div>  
  </div>
  );
};
