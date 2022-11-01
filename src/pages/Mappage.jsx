import React from "react";
import { useState,useEffect } from "react";
import { MapWindow } from "../components/MapWindow";
import { HostelListing } from "./HostelListing";
import { Products } from "./Products";
export const Mappage = ({isAuth}) => {
    const [lat, setLat] = useState(10.028373499551039);
    const [lng, setLng] = useState(76.328516463327);
    const [resData,setResData] = useState([]);
    const dataHandler = async () => {
      const url = "http://localhost:8080/hostels"
      const response = await fetch(url)
      const data = await response.json()
      setResData(data);
      console.log(data)
    }
  
    useEffect(() => {
    dataHandler()
  }, [])
  
    return (
      <div  className="min-h-screen flex flex-row">
        hello
      </div>
  )
}
