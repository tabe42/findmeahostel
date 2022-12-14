import { deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState,useRef } from "react";
import { collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { ItemBar } from "../components/ItemBar";
import { deleteObject, ref } from "firebase/storage";
import { MapWindow} from "../components/MapWindow"


export const Listings = ({ isAuth }) => {
  const [productList, setProductList] = useState([]);
  const [randstate, setRandstate] = useState(0);
  const [query, setQuery] = useState("");
  let isCollegeSelected = true
  //map
    const [lat, setLat] = useState(10.028373499551039);
    const [lng, setLng] = useState(76.328516463327);
    const [resData,setResData] = useState([]);
    const [collegeSelected, setCollegeSelected] = useState(isCollegeSelected)
    const [college, setCollege] = useState("")

  const deleteProduct = async (pid) => {
    const productDoc = doc(db, "products", pid);
    const docSnap = await getDoc(productDoc);
    console.log("snapshot is", docSnap.data());
    const tobedeletedname = docSnap.data().imagename;
    console.log("name to be deleted", tobedeletedname);

    // console.log("deleted doc:", productDoc); 
   
    await deleteDoc(productDoc);
    const imagereference = ref(storage, `images/${tobedeletedname}`);
    // Delete the file
    deleteObject(imagereference)
      .then(() => {
        console.log("image deleted from firebase");
      })
      .catch((error) => {
        console.log(error);
      });
    setRandstate(randstate + 1);
  };


  const productCollectionRef = collection(db, "products");
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef);
      console.log("hi", data);
      setProductList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const dataHandler = async () => {
      // Aws server -> "https://shrouded-plateau-82529.herokuapp.com/http://13.127.116.174:8080/springbbot-mongo-atlas/tasks/"
      
      const url = "https://shrouded-plateau-82529.herokuapp.com/https://backend-findmeahostel.herokuapp.com/tasks/"
      const response = await fetch(url)
      const data = await response.json()
      setResData(data);
      console.log(data)
    }
    dataHandler()
    getProducts()
  }, [randstate,collegeSelected]);
  
  
  //Search bar
  const filteredproductList = resData.filter((hostel) => {
    return hostel.address.toLowerCase().includes(query);
  }).filter((hostel) => {
    console.log("hostel college:",hostel.college)
    return hostel.college.includes(college);
  });

  //functions from map
  const thisIsMyMap = useRef(null);
  const thisIsMyMapMobile = useRef(null);
  const dummy= useRef(null);
  
  return (
    <>
    <div className="hidden md:flex flex-row justify-center  items-center md:mt-2 overflow-hidden">
{collegeSelected?<div className="position-static flex items-center mt-12  justify-center w-3/5">
  
  <MapWindow  setCurrentCollege={setCollege} ref={{thisIsMyMap:thisIsMyMap,thisIsMyMapMobile:dummy}} resData={resData} isAuth={isAuth} lat={lat} lng={lng} collegeSelected={collegeSelected} setCollegeSelected={setCollegeSelected} height={"70vh"} width={"45vw"}/>
</div>:<div className="position-static flex items-center justify-center mt-12 ml-8 ">
  <MapWindow  setCurrentCollege={setCollege} ref={{thisIsMyMap:thisIsMyMap,thisIsMyMapMobile:dummy}} resData={resData} isAuth={isAuth} lat={lat} lng={lng} collegeSelected={collegeSelected} setCollegeSelected={setCollegeSelected} height={"70vh"} width={"45vw"}/>
</div>}
  {collegeSelected?
  <div className="flex flex-col space-y-4 md:mt-0 items-center mb-4 w-2/5">
      <div className=" flex flex-row justify-between px-2 items-center text-xl py-4 border-1 bg-white shadow-lg mt-4 w-2/3 rounded-md">
        <input
          className=" p-1 rounded-md w-full focus:outline-none "
          placeholder=" search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          />
        <div className="flex flex-row space-x-2 items-center justify-center opacity-50">
          <p className="">&#128269;</p>
        </div>
      </div>
        <div className="">Tip: Click on cards to navigate</div>
        <div className="flex flex-col h-96 space-y-4 overflow-y-scroll">
      {(filteredproductList.length==0)?<div className="text-xl text-center">Please wait while backend server starts up, we are on free tier</div>:filteredproductList.map((hostel) => {
        return (
          <div onClick={()=>{
            thisIsMyMap.current.flyTo({
              center: [hostel.lon,hostel.lat],
              zoom:18,
              essential: true
            });
          console.log(thisIsMyMap.current.getZoom());
          }}>
          <ItemBar
          key={hostel.hostelId}
          address={hostel.address}
          contact={hostel.phone}
          rent={hostel.rent}
          beds={hostel.bedrooms}
          bath={hostel.baths}
          area={hostel.area}
          imageurl={hostel.url}
          hostelId={hostel.hostelId}
          deleteProduct={deleteProduct}
          isAuth={isAuth}
          walktime={hostel.walktime}

          />
          </div>
          );
      })}</div>
            <div className="text-gray-600 font-light">
            Scroll down
            </div>
    </div>
    
    :
    <></>
    }

    </div>

    {/* mobile */}




    <div className="flex flex-col  md:hidden justify-center h-screen items-start overflow-clip [@media(max-width:767px)]:scrollbar-hide">
{collegeSelected?<div className="position-static flex items-center justify-center">
  
  <MapWindow  setCurrentCollege={setCollege} ref={{thisIsMyMap:dummy,thisIsMyMapMobile:thisIsMyMapMobile}} resData={resData} isAuth={isAuth} lat={lat} lng={lng} collegeSelected={collegeSelected} setCollegeSelected={setCollegeSelected} height={"30vh"} width={"100vw"}/>
</div>:<div className="position-static flex items-center justify-center -mt-10">
  <MapWindow  setCurrentCollege={setCollege} ref={{thisIsMyMap:dummy,thisIsMyMapMobile:thisIsMyMapMobile}} resData={resData} isAuth={isAuth} lat={lat} lng={lng} collegeSelected={collegeSelected} setCollegeSelected={setCollegeSelected} height={"40vh"} width={"100vw"}/>
</div>}
  {collegeSelected?
  <div className="flex flex-col space-y-4  items-center mb-4 mt-2 h-screen overflow-y-scroll w-full">
      <div className="flex w-full flex-row justify-between px-2 items-center text-xl py-4 border-1 bg-white shadow-lg mt-4 ml-2 mr-2 rounded-md">
        <input
          className=" p-1 rounded-md w-full focus:outline-none "
          placeholder=" search..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          />
        <div className="flex flex-row space-x-2 items-center justify-center opacity-50">
          <p className="">&#128269;</p>
        </div>
      </div>
      
      {(filteredproductList.length==0)?<div className="text-xl text-center">Please wait while server loads up, we are on free tier</div>:filteredproductList.map((hostel) => {
        return (
          <div 
          className="flex min-w-full"
          onClick={()=>{thisIsMyMapMobile.current.flyTo({
            center: [hostel.lon,hostel.lat],
            zoom:19,
            essential: true
          });
          
          }}>
          <ItemBar
          
          key={hostel.hostelId}
          address={hostel.address}
          contact={hostel.phone}
          rent={hostel.rent}
          beds={hostel.bedrooms}
          bath={hostel.baths}
          area={hostel.area}
          imageurl={hostel.url}
          hostelId={hostel.hostelId}
          deleteProduct={deleteProduct}
          isAuth={isAuth}
          walktime={hostel.walktime}
          />
          </div>
          );
      })}

      </div>
    :
    <></>
    }

    </div>



    </>

  );
};
