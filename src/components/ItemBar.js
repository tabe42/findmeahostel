import { deleteDoc, doc } from "firebase/firestore";
import React from "react";    
import { auth, db } from "../firebase-config";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export const ItemBar = ({
  imageurl,
  hostelId,
  rent,
  beds,bath,area,
  address,
  contact,
  lat,
  lon,
  walktime
}) => {

  return (
    <>
    <div className="rounded-2xl">

   <div >
    <div className="hidden w-full lg:max-w-full md:flex max-h-48 overflow-clip shadow-sm">
       <div className="flex flex-col">
       <div className="z-10 relative translate-y-12 -mt-10 text-xs w-32 justify-center rounded-full m-1 font-normal p-1 bg-primary text-white text-center shadow-xl">{(walktime/60).toPrecision(2)} minutes away</div>
      <img src={imageurl} className=" h-36 shadow-lg object-cover lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-white" title="Mountain">
      </img>
      </div>
      <div className="py-4 px-4  border-r text-xs border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4  justify-between leading-normal w-72 flex flex-col">
      
          <div className="flex justify-between"><div className="w-30 text-gray-800 font-bold">{address}</div><div className="shadow-inner flex bg-white bg-zinc-700  px-3 py-1 rounded-full text-center text-white items-center justify-center"><span className=" flex text-xs font-normal ">
            <div><Link to='/chatroom'>
            <svg width="12px" height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#000000" stroke-width="2" d="M5,1 L19,1 L19,1 C21.209139,1 23,2.790861 23,5 L23,13 L23,13 C23,15.209139 21.209139,17 19,17 L7,17 L1,22 L1,5 L1,5 C1,2.790861 2.790861,1 5,1 Z M5,7 L18,7 M5,11 L14,11" transform="matrix(-1 0 0 1 24 0)"/>
</svg>
              {/* <svg width="12px" height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> */}
              </Link></div>
            </span></div></div>
          <div className="flex items-center flex-row text-gray-600 text-xs">
            <span>
            Rs{rent}</span><span>/mo</span>
              </div>
          <div className="flex justify-between shadow-inner px-3 p-1 text-gray-600 rounded-full">
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Beds  
              </div>
              <div className="ml-1 text-xs">
                {beds}
              </div>
            </div>
            <div>|</div>
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Baths
              </div>
              <div className="ml-1 text-xs">
                {bath}
              </div>
            </div>
            <div>|</div>
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Area  
              </div>
              <div className="ml-1 text-xs">
                {area} sqft
              </div>
            </div>
          </div>

      </div>
    </div>
  </div>

  {/* // mobile */}


   
  <div className="flex md:hidden min-w-full lg:max-w-full md:-ml-2 flex-col">
  <div className="z-10 relative translate-y-16 -mt-10 text-xl w-48 justify-center rounded-full m-1 font-bold p-2 bg-primary text-white text-cente shadow-xl">{(walktime/60).toPrecision(2)} minutes away</div>
  <img src={imageurl} className="flex w-screen sm:h-auto object-contain sm:w-48 flex-none bg-cover rounded-t lg:rounded-t-none sm:rounded-l text-center overflow-hidden bg-white" title="Mountain">
  </img>
  <div className="py-4 px-4 h-48  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4  justify-between leading-normal w-full flex flex-col">
      <div className="flex justify-between font-bold text-gray-700 text-sm py-1 w-2/3"><span> {address}</span></div>
      <div className="flex justify-between font-normal text-gray-700 items-center"><div>contact:{contact}</div><div className=" flex justify-center shadow-inner border-2 p-2 px-4 rounded-full text-gray-600 -mt-6"><span className="font-extrabold">Rs {rent}</span><span className="font-normal ml-1">/mo</span></div></div>
      <div className="flex shadow-inner text-gray-800 font-bold rounded-full px-6 py-3 -mt-4 justify-between">
        <div className="flex flex-row  items-center">
          <div className="text-xs">
            Bedrooms:
          {/* <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> */}
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M22 11v9h-2v-3H4v3H2V4h2v10h8V7h6a4 4 0 0 1 4 4zm-2 3v-3a2 2 0 0 0-2-2h-4v5h6zM8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </g>
            {/* </svg>   */}
          </div>
          <div className="ml-1 text-xs">
            {beds}
          </div>
        </div>
        <div>|</div>
        <div className="flex flex-row items-center">
          <div className="text-xs">
          {/* <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"/></svg> */}
          Bathrooms
          </div>
          <div className="ml-1 text-xs">
            {bath}
          </div>
        </div>
        <div>|</div>
        <div className="flex flex-row items-center">
          <div className="text-xs">
          <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M29 30l1 90h36V66h26V30H29zm99 0v36h72V30h-72zm108 0v36h72V30h-72zm108 0v36h72V30h-72zm102 0v78h36V30h-36zm-206 80v36h100.543l-118 118H30v218h218V289.457l118-118V272h36V110H240zm206 34v72h36v-72h-36zM30 156v72h36v-72H30zm416 96v72h36v-72h-36zm0 108v72h36v-72h-36zm-166 86v36h72v-36h-72zm108 0v36h72v-36h-72z"/></svg>  
          </div>
          <div className="ml-1 text-xs">
            {area} sqft
          </div>
        </div>
      
      </div>
      
  </div>
</div>
</div>

</>
  );
};
