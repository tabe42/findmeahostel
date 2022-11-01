import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase-config";

export const ItemBar = ({
  imageurl,
  hostelId,
  rent,
  beds,bath,area,
  address,
}) => {
  return (
    <div >
      {/* <img src={imageurl} alt="error" classNameName="h-1/3 md:w-1/3 rounded-md shadow-sm " />
      <div classNameName=" block w-full flex py-4">
      <div classNameName="flex flex-col pl-4 font-medium space-y-2 justify-start w-full block">
      <div classNameName="flex flex-row w-full justify-between font-bold text-xl ">
        <p classNameName="">{productname}</p>
        <p classNameName="font-bold text-lg w-1/5">{price}</p>
      </div>
        <p>Seller: {name}</p>
        <p>Contact: {contact}</p>
        <p>{description}</p>
      {isAuth && productsellerid === auth.currentUser.uid && (
        <button
          onClick={() => {
            deleteProduct(id);
          }}
          classNameName="bg-white p-2 rounded-md  text-blue-600 hover:bg-gray-200 ml-auto self-end "
        >
          Delete
        </button>
      )}
      </div>
      </div> */}
   
    <div className=" w-full lg:max-w-full lg:flex m">
      <img src={imageurl} className=" lg:h-auto object-contain lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-white" title="Mountain">
      </img>
      <div className="py-4 px-4  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4  justify-between leading-normal w-72 flex flex-col">
          <div className="flex justify-between"><div>House Name</div><div><span className="font-extrabold text-gray-600">${rent}</span><span>/mo</span></div></div>
          <div className="flex w-56 text-xs"><span>{address}</span></div>
          <div className="flex justify-between">
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Bedrooms  
              </div>
              <div className="ml-1 text-xs">
                {beds}
              </div>
            </div>
            <div>|</div>
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Bathrooms
              </div>
              <div className="ml-1 text-xs">
                {beds}
              </div>
            </div>
            <div>|</div>
            <div className="flex flex-row items-center">
              <div className="text-xs">
                Area  
              </div>
              <div className="ml-1 text-xs">
                {beds}
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
};
