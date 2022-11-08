import { deleteDoc, doc } from "firebase/firestore";
import React from "react";    
import { auth, db } from "../firebase-config";
import { useEffect } from "react";
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
          <div className="flex justify-between"><div className="w-30 text-gray-800 font-bold">{address}</div><div className="shadow-inner flex bg-white bg-zinc-700  px-3 py-1 rounded-full text-center text-white items-center justify-center"><span className=" flex font-extrabold  ">Rs{rent}</span><span>/mo</span></div></div>
          <div className="flex items-center flex-row text-gray-600 text-xs">
              <svg className="mr-1" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-g</title><path d="M22.45 17.35c-0.245 -0.261 -1.109 -1.031 -2.697 -2.051 -1.6 -1.028 -2.78 -1.67 -3.118 -1.819a0.18 0.18 0 0 0 -0.184 0.023c-0.545 0.425 -1.463 1.206 -1.512 1.248 -0.318 0.272 -0.318 0.272 -0.578 0.188 -0.458 -0.15 -1.879 -0.905 -3.117 -2.146s-2.032 -2.698 -2.182 -3.155c-0.086 -0.261 -0.086 -0.261 0.188 -0.578 0.042 -0.049 0.824 -0.967 1.249 -1.512a0.18 0.18 0 0 0 0.023 -0.184c-0.15 -0.339 -0.791 -1.518 -1.819 -3.118 -1.021 -1.588 -1.791 -2.452 -2.051 -2.696A0.183 0.183 0 0 0 6.469 1.509 15.11 15.11 0 0 0 3.844 2.702 15.844 15.844 0 0 0 1.563 4.313a0.18 0.18 0 0 0 -0.059 0.175c0.098 0.457 0.566 2.362 2.019 5.002 1.483 2.694 2.51 4.075 4.688 6.245S11.813 18.994 14.51 20.477c2.64 1.453 4.547 1.922 5.002 2.019a0.181 0.181 0 0 0 0.176 -0.059A15.831 15.831 0 0 0 21.298 20.156a15.127 15.127 0 0 0 1.193 -2.625A0.183 0.183 0 0 0 22.45 17.35Z"/>
              </svg> 
            <span>
              {contact}</span>
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
