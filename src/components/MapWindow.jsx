import React from 'react'
import { useState,useRef } from 'react';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl
  } from "react-map-gl";
import mapboxgl from 'mapbox-gl';

const locations = {'CET':[76.9063,8.5459],'MEC':[76,10.2]}

export const MapWindow = ({resData,lat,lng}) => {
    const [showPopup, setShowPopup] = useState(true);
    const [redirect, setRedirect] = useState([0,0])
    const markerClickHandler = (e) => {
        e.target.setPopup(new mapboxgl.Popup().setHTML("<h1>details</h1>"))
    }
    const thisIsMyMap = useRef(null);

    const handleClick = (e) => {
        console.log(e)
        setRedirect([76.9063,8.5459])
        console.log(redirect)
        thisIsMyMap.current.flyTo({
            center: redirect,
            zoom:14,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
            })
    }
  return (
    <div className='flex'>

    <Map
    mapboxAccessToken="pk.eyJ1IjoidG9iYWJlIiwiYSI6ImNsN3BybnhpZjBmYWY0MXM3bGc3Yzd1eGcifQ.p3whIN6-M7IqOJF47PtmZg"
    style={{
        width: "40vw",
        height: "75vh",
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
    <Marker key={item.hostelId} longitude={item.lon} latitude={item.lat} onClick={markerClickHandler}/>
    <Popup key={item.hostelId+123123} longitude={item.lon} latitude={item.lat} anchor="bottom" offset="25"
        onClose={() => setShowPopup(false)}>
        <h1>{item.lon}</h1>
    
    
    </Popup>
    
    </>
        )
    })}

    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
  </Map>
  <button value={[lat,lng] } className='w-10 h-10 bg-red-700' onClick={handleClick}>MEC</button>
  <button id='CET' className='w-10 h-10 bg-red-700' onClick={handleClick} >CET</button>

    </div>
  )
}
