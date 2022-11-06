import React, { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { DraggableMap } from "../components/DraggableMap";
import { FormComponent } from "../components/FormComponent";
import Axios from "axios";

export const AddProduct = ({ isAuth }) => {
  const [productname, setProductname] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  

  const [imageinput, setImageinput] = useState(null);
  const [imageurl, setImageurl] = useState("https://cdn.dribbble.com/users/989466/screenshots/16168689/media/66899610428d098a4467516591ce01ae.png?compress=1&resize=400x300");
  const [imagename, setImagename] = useState("");

  const [lat, setLat] = useState(10.028373499551039);
  const [lng, setLng] = useState(76.328516463327);
  const [address, setAddress] = useState("");
  const [bedroom, setBedroom] = useState(2);
  const [bath, setBath] = useState(2);
  const [area, setArea] = useState(100);
  const [rent, setRent] = useState(0);
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [walkingTime, setWalkingTime] = useState(0)
  const [buildingType, setBuildingType] = useState("")

  const productCollectionRef = collection(db, "products");
  let navigate = useNavigate();



const [data, setData] = useState({
  lat,lng
});
const handle = (e) => {
  const newdata = { ...data };
  newdata[e.target.id] = e.target.value;
  setData(newdata);
  console.log(newdata);
};
let walk=0



  // const addProduct = async (url, imagename) => {
  //   await addDoc(productCollectionRef, {
  //     imagename,
  //     imageurl: url,
  //     productname,
  //     contact,
  //     description,
  //     price,
  //     seller: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
  //   });
  //   // navigate("/products");
  // };

const getWalkTime = async () =>{
  let url="https://api.mapbox.com/directions-matrix/v1/mapbox/walking/"+lng+","+lat+";"+"76.328516463327"+","+"10.028373499551039"+"?sources=1&annotations=distance,duration&access_token=pk.eyJ1IjoidG9iYWJlIiwiYSI6ImNsN3BybnhpZjBmYWY0MXM3bGc3Yzd1eGcifQ.p3whIN6-M7IqOJF47PtmZg"
  console.log("url:",url)
  await Axios.get(url)
  .then(function (response) {
    walk=response.data.durations[0][0]
    console.log("got", walk)
  })
}




  let staticUrl = ""
  const uploadImage = async () => {
    if (imageinput == null)
      return;
    const imgname = imageinput.name + v4();
    console.log(imgname);
    setImagename(imgname);
    const imageRef = ref(storage, `images/${imgname}`);
    uploadBytes(imageRef, imageinput).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageurl(url);
        staticUrl = url
        // addProduct(url, imgname);
        console.log("reached here")
      }).then(()=>getWalkTime()).then(()=>{
        console.log("submitting",imageurl,lng)
        console.log("submitting",walk)
        Axios.post("https://shrouded-plateau-82529.herokuapp.com/https://backend-findmeahostel.herokuapp.com/tasks/add/", {
          lat: lat,
          lon: lng,
          address:address,
          bedrooms:bedroom,
          baths:bath,
          area:area,
          phone:phone,
          rent:rent,
          url:staticUrl,
          buildingType:buildingType,
          college:college,
          walktime:walk
        })
          .then((res) => {
            console.log(res.data)
            navigate("/products");
          })
          .catch((e) => console.log("Error encountered: ", e));

      })

      // alert("image uploaded");
    });
    
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  return (
    <div className="h-auto flex flex-col-reverse md:flex-row items-center justify-center p-4 max-w-screen">
      {/* <FormComponent lat={lat} lng={lng} setLat={setLat} setLng={setLng} data={data} setData={setData} handle={handle} submit={submit}/> */}
      <div className="m-auto">
        <div className="flex flex-col space-y-4 justify-center   bg-gray-100  shadow-md rounded-md p-8 w-fit h-fit">
          <label for="files">Upload image</label>
          <input
            required
            id="files"
            type="file"
            onChange={(e) => {
              setImageinput(e.target.files[0]);
            }}
          />

          {/* <input
            required
            className="border-2 p-2 rounded-md"
            placeholder="Address of property"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          /> */}
          <input
            required
            type="text"
            className="border-2 p-2 rounded-md"
            placeholder="Contact information(phone/email)"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            required
            type="number"
            placeholder="Rent"
            className="border-2 p-2 rounded-md"
            onChange={(e) => {
              setRent(e.target.value);
            }}
          />
          <div>

          <select
            required
            type="number"
            placeholder="College"
            className="border-2 p-2 rounded-md w-1/2"
            onChange={(e) => {
              setCollege(e.target.value);
            }}
            >
              <option value="" disabled selected>Select College</option>
              <option value="MEC">MEC</option>
              <option value="TKM">TKM</option>
              <option value="CET">CET</option>
            </select>
          <select
            required
            type="number"
            className="border-2 p-2 rounded-md w-1/2"
            onChange={(e) => {
              setBuildingType(e.target.value)
            }}
            >
              <option value="" disabled selected>Select building type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Room">Room</option>
            </select>
   
            </div>
            <div>

          <input
            required
            type="number"
            placeholder="No of Beds"
            className="border-2 p-2 rounded-md w-1/3"
            onChange={(e) => {
              setBedroom(e.target.value);
            }}
            />
          <input
            required
            type="number"
            placeholder="No of Baths"
            className="border-2 p-2 rounded-md w-1/3"
            onChange={(e) => {
              setBath(e.target.value);
          }}
          />
        <input
          required
          type="number"
          placeholder="Area in sqft"
          className="border-2 p-2 rounded-md w-1/3"
          onChange={(e) => {
            setArea(e.target.value);
          }}
          />
          </div>
          <textarea
            
            rows="4"
            className="border-2 p-2 rounded-md  resize-none md:hidden"
            placeholder="Address of property"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <textarea
            rows="4"
            cols="40"
            className="border-2 p-2 rounded-md resize-none hidden md:flex"
            placeholder="Address of property"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <button
            onClick={uploadImage}
            className=" self-center bg-blue-600 p-2 text-white shadow-md rounded-md"
          >
            List Item{" "}
          </button>
        </div>
      </div>
      <DraggableMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      <h3 className="font-bold text-md -my-2 md:hidden">Drag marker to property location</h3>
    </div>
  );
};
