import React from "react";
import { useState } from "react";
import Axios from "axios";
export const FormComponent = ({lat,lng,setLat,setLng,submit,handle}) => {

  return (
    <form>
      <input
        onChange={(e) => handle(e)}
        value={lat}
        id="lat"
        placeholder="lat"
        type="number"
      ></input>
      <input
        onChange={(e) => handle(e)}
        value={lng}
        id="lon"
        placeholder="lon"
        type="number"
      ></input>
      <button onClick={submit}>Submit</button>
    </form>
  );
};