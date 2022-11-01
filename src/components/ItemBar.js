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
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
          <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#000"  d="M12,10 C14.209139,10 16,8.209139 16,6 C16,3.790861 14.209139,2 12,2 C9.790861,2 8,3.790861 8,6 C8,8.209139 9.790861,10 12,10 Z M12,10 L12,22"/>
</svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{}</div>
          <p className="text-gray-700 text-base">{address}</p>
        </div>
        
        <div className="flex flex-row space-x-8">
          <div className="flex items-center">
          <svg width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 6 6 C 4.355469 6 3 7.355469 3 9 L 3 15.78125 C 2.390625 16.332031 2 17.121094 2 18 L 2 27 L 7 27 L 7 25 L 25 25 L 25 27 L 30 27 L 30 18 C 30 17.121094 29.609375 16.332031 29 15.78125 L 29 9 C 29 7.355469 27.644531 6 26 6 Z M 6 8 L 26 8 C 26.554688 8 27 8.445313 27 9 L 27 15 L 25 15 L 25 14 C 25 12.355469 23.644531 11 22 11 L 18 11 C 17.234375 11 16.53125 11.300781 16 11.78125 C 15.46875 11.300781 14.765625 11 14 11 L 10 11 C 8.355469 11 7 12.355469 7 14 L 7 15 L 5 15 L 5 9 C 5 8.445313 5.445313 8 6 8 Z M 10 13 L 14 13 C 14.554688 13 15 13.445313 15 14 L 15 15 L 9 15 L 9 14 C 9 13.445313 9.445313 13 10 13 Z M 18 13 L 22 13 C 22.554688 13 23 13.445313 23 14 L 23 15 L 17 15 L 17 14 C 17 13.445313 17.445313 13 18 13 Z M 5 17 L 27 17 C 27.554688 17 28 17.445313 28 18 L 28 25 L 27 25 L 27 23 L 5 23 L 5 25 L 4 25 L 4 18 C 4 17.445313 4.445313 17 5 17 Z"/></svg>
            <div className="text-sm" >
              <p className="text-gray-900 leading-none">{beds}</p>
              <p className="text-gray-600">Bedrooms</p>
            </div>
            
          </div>
          <div className="flex items-center">
          <svg width="32px" height="32px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path  d="M464,280H80V100A51.258,51.258,0,0,1,95.113,63.515l.4-.4a51.691,51.691,0,0,1,58.6-10.162,79.1,79.1,0,0,0,11.778,96.627l10.951,10.951-20.157,20.158,22.626,22.626,20.157-20.157h0L311.157,71.471h0l20.157-20.157L308.687,28.687,288.529,48.844,277.578,37.893a79.086,79.086,0,0,0-100.929-8.976A83.61,83.61,0,0,0,72.887,40.485l-.4.4A83.054,83.054,0,0,0,48,100V280H16v32H48v30.7a23.95,23.95,0,0,0,1.232,7.589L79,439.589A23.969,23.969,0,0,0,101.766,456h12.9L103,496h33.333L148,456H356.1l12,40H401.5l-12-40h20.73A23.969,23.969,0,0,0,433,439.589l29.766-89.3A23.982,23.982,0,0,0,464,342.7V312h32V280ZM188.52,60.52a47.025,47.025,0,0,1,66.431,0L265.9,71.471,199.471,137.9,188.52,126.951A47.027,47.027,0,0,1,188.52,60.52ZM432,341.4,404.468,424H107.532L80,341.4V312H432Z" className="ci-primary"/>
</svg>

            <div className="text-sm" >
              <p className="text-gray-900 leading-none">{bath}</p>
              <p className="text-gray-600">Bathrooms</p>
            </div>
            
          </div>
          <div className="flex items-center">
          <svg width="32px" height="32px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none"  stroke="#000000"  transform="translate(5 5)"><path d="m10.5 4.5v-3.978l-4-.022"/><path d="m4.5 10.523h-4v-4.023"/></g></svg>

            <div className="text-sm" >
              <p className="text-gray-900 leading-none">{area}</p>
              <p className="text-gray-600">sqft</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
