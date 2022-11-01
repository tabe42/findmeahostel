import React from 'react'
import { useState } from 'react';
import Map, {
    Marker,
    NavigationControl,
    Popup,
    FullscreenControl,
    GeolocateControl,
  } from "react-map-gl";

export const DraggableMap = ({lat,lng,setLat,setLng}) => {
    
    const positionHandler = (e) => {
        setLat(e.target.getLngLat().lat)
        setLng(e.target.getLngLat().lng)
        console.log(lat,lng)
    }
    return (
    <div className='m-auto md:mt-8'>
    <div className='hidden md:flex'>
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
      zoom: 13
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={lng} latitude={lat} draggable='true' onDrag={positionHandler}/>

    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
  </Map>
  </div>
  <div className='md:hidden m-auto p-4 '>
  <Map
    mapboxAccessToken="pk.eyJ1IjoidG9iYWJlIiwiYSI6ImNsN3BybnhpZjBmYWY0MXM3bGc3Yzd1eGcifQ.p3whIN6-M7IqOJF47PtmZg"
    style={{
      width: "80vw",
      height: "300px",
      borderRadius: "15px",
    }}
    initialViewState={{
      longitude: lng,
      latitude: lat,
      zoom: 13
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={lng} latitude={lat} draggable='true' onDrag={positionHandler}/>

    <NavigationControl position="bottom-right" />
    <FullscreenControl />

    <GeolocateControl />
  </Map>
  </div>
  </div>
    )
  }
