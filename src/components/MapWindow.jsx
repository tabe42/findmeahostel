import React, { useEffect } from 'react'
import { useState,useRef,forwardRef } from 'react';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl
  } from "react-map-gl";
import mapboxgl from 'mapbox-gl';

const locations = {'CET':[76.9063,8.5459],'MEC':[76,10.2]}

// const popupStyle ={
//   backgroundColor: "#FF0000",
//   backgroundImage:`url(${hostel.url})`,
//   backgroundSize: cover,
//   width: 50,
//   height: 50,
//   borderRadius: 50,
//   cursor: pointer,
// }


export const MapWindow = forwardRef((
  {
  resData,
  lat,lng,
  isCollegeSelected,
  collegeSelected,setCollegeSelected,
  height,width,
  setCurrentCollege
  },
  
  ref) => {
    
  
  const { thisIsMyMap, thisIsMyMapMobile } = ref

   const [showPopup, setShowPopup] = useState(true);
    
    const [collegeSelected2, setCollegeSelected2] = useState(false)
    const markerClickHandler = (e) => {
        // e.target.setPopup(new mapboxgl.Popup().setHTML("<h1></h1>"))
    }

    let latlong ;
    const handleClick = (e) => {
        const handleChange = async () =>{isCollegeSelected = !isCollegeSelected
        console.log("val set to true" ,isCollegeSelected)
        setCurrentCollege(e.target.name)
        setCurrentCollege(e.target.name)
        latlong = [e.target.value,e.target.id]
        setCollegeSelected2(!isCollegeSelected)}
        handleChange().then(()=>{
            setCollegeSelected(isCollegeSelected)
            handleFly()
        })
        
    }
    const handleClickMobile = (e) => {
      const handleChange = async () =>{isCollegeSelected = !isCollegeSelected
      console.log("val set to true" ,isCollegeSelected)
      console.log("inside handleClickMobile",e.target.name)
      setCurrentCollege(e.target.name)
      setCurrentCollege(e.target.name)
      latlong = [e.target.value,e.target.id]
      setCollegeSelected2(!isCollegeSelected)}
      handleChange().then(()=>{
          setCollegeSelected(isCollegeSelected)
          handleFlyMobile()
      })
      
  }
    const handleClick2 = (e) => {
        isCollegeSelected = !isCollegeSelected
        console.log("val set to false" ,isCollegeSelected)
        setCollegeSelected2(!isCollegeSelected)
        setCollegeSelected2(isCollegeSelected)
        handleFly()
        
    }
    const handleClick2Mobile = (e) => {
      isCollegeSelected = !isCollegeSelected
      console.log("val set to false" ,isCollegeSelected)
      setCollegeSelected2(!isCollegeSelected)
      setCollegeSelected2(isCollegeSelected)
      handleFlyMobile()
      
  }
    const handleFly = () => {
        thisIsMyMap.current.flyTo({
            center: latlong,
            zoom:14,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
    }
    const handleFlyMobile = () => {
      thisIsMyMapMobile.current.flyTo({
          center: latlong,
          zoom:14,
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
          })
  }
    useEffect(()=>{setCollegeSelected(!collegeSelected)},[collegeSelected2])
  return (
    <>
    <div className='hidden md:flex'>
    <Map
    mapboxAccessToken="pk.eyJ1IjoidG9iYWJlIiwiYSI6ImNsN3BybnhpZjBmYWY0MXM3bGc3Yzd1eGcifQ.p3whIN6-M7IqOJF47PtmZg"
    style={{
        width:  width,
        height: height,
        borderRadius: "15px",
    }}
    initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 13,
        projection: 'globe'
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    ref={thisIsMyMap}
    >
    <Marker longitude={lng} latitude={lat} />
    {resData.map( (item)=>{
        return (
            <>
    {/* <Marker 
 
  key={item.hostelId}  longitude={item.lon} latitude={item.lat} onClick={markerClickHandler} 
    >

      </Marker> */}
    <Popup key={item.hostelId+123123} longitude={item.lon} latitude={item.lat} anchor="bottom" offset="25"
        // onClose={() => setShowPopup(false)}
        closeOnClick={false}
        className="flex"
        closeButton="false"
    
        style={{backgroundColor:'transparent',margin:'0',padding:'0',}}

        >
        <div className='flex flex-col items-center rounded-full'>
          <img className='h-12 w-12' src={item.url}></img>
          <span className='text-xs font-extrabold'>${item.rent}</span>
        </div>
    </Popup>
    
    </>
        )
    })}

    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
  </Map>
  {
  collegeSelected?<button id={66} value={-123.9749} className='w-10 h-10 ml-2 bg-red-700 rounded-full' onClick={handleClick2} >Back</button>:
  
  
  
  <div className='flex flex-col space-y-4 mt-4 items-center mb-4 h-screen overflow-y-scroll p-8 w-[50vw]'>  
    <div className="flex flex-col space-y-4 mt-4 items-center mb-4 h-screen overflow-y-scroll w-full">
      <div className=" flex flex-row px-2 items-center justify-center text-xl py-4 border-1 text-white font-extrabold shadow-lg mt-4 w-2/3 rounded-md">
        Choose your College
      </div>
    <button id={lat} value={lng} name="MEC" className='w-full h-20 rounded-lg bg-white' onClick={handleClick}>Model Engineering College</button>
    <button id={8.5459} value={76.9063} name="CET" className='w-full h-20 rounded-lg bg-white' onClick={handleClick} >CET</button>
    <button id={8.9142} value={76.6320} name="TKM" className='w-full h-20 rounded-lg bg-white' onClick={handleClick} >TKM</button>
    </div>
  </div>
  }
    </div>
    
    {/* mobile */}
    
    <div className='flex flex-col md:hidden'>
    <Map
    mapboxAccessToken="pk.eyJ1IjoidG9iYWJlIiwiYSI6ImNsN3BybnhpZjBmYWY0MXM3bGc3Yzd1eGcifQ.p3whIN6-M7IqOJF47PtmZg"
    style={{
        width:  width,
        height: height,
        borderRadius: "15px",
    }}
    initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 13,
        projection: 'globe'
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    ref={thisIsMyMapMobile}
    >
    <Marker longitude={lng} latitude={lat} />
    {resData.map( (item)=>{
        return (
            <>
    {/* {/* <Marker key={item.hostelId} longitude={item.lon} latitude={item.lat} onClick={markerClickHandler}  */}
        

    {/* /> */}
    <Popup  key={item.hostelId+123123} longitude={item.lon} latitude={item.lat} offset="25"
        closeOnClick={false}
        className="flex"
        anchor="bottom"
        closeButton="false"
    
        style={{backgroundColor:'transparent',margin:'0',padding:'0',}}

        >
        <div className='flex flex-col items-center bg-transparent -m-8 rounded-full'>
          <img className='h-12 w-12 rounded-full border-4 border-white' src={item.url}></img>
          <span className='text-sm font-extrabold bg-white rounded-xl p-1 -mt-2 text-gray-700 z-40'>Rs{item.rent}</span>
        </div>
    
    
    </Popup>
    
    </>
        )
    })}

    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
  </Map>
  {
  collegeSelected?<button id={66} value={-123.9749} className='w-auto z-10 h-10 mt-2 ml-2 text-gray-100 bg-red-700 font-bold rounded-full' onClick={handleClick2Mobile} >Select another college</button>:
  
  
  
  <div className='flex flex-col items-center mb-4 overflow-y-scroll w-[80vw] h-80'>  
    <div className="flex flex-row space-y-4  items-center h-screen overflow-y-hidden w-full">
      <div className=" flex flex-row px-2 items-center justify-center text-xl py-4 border-1 text-white font-extrabold w-1/2 rounded-md">
        Choose your College
      </div>
      <div className='w-1/2 flex flex-col space-y-1.5'>
        <button name='MEC' id={lat} value={lng} className='w-full h-20 rounded-lg bg-white' onClick={handleClickMobile}>Model Engineering College</button>
        <button name='CET' id={8.5459} value={76.9063} className='w-full h-20 rounded-lg bg-white' onClick={handleClickMobile} >CET</button>
        <button name='TKM' id={8.9142} value={76.6320} className='w-full h-20 rounded-lg bg-white' onClick={handleClickMobile} >TKM</button>
      </div>
    </div>
  </div>
  }
</div>
    
    
    
    
    
    
    
    
    </>
  )
}
)