import React from "react";
import park from "./park.jpg";
import "./Pin.scss";

function Pin() {
  return <div className="pin">
    <img src={park} alt="pin1"/>
  </div>
}

export default Pin;