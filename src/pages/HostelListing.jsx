import React from 'react'
import { useState } from 'react';
import { DraggableMap } from '../components/DraggableMap';

export const HostelListing = () => {
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
    return (
        <div>
            <DraggableMap/>
        </div>
  )
}
