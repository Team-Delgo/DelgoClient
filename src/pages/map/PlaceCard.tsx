import React from "react";
import "./PlaceCard.scss";

function PlaceCard (props:{img:string, title:string, address:string}){
  const {img, title, address} = props;
  return <div className="placecard">
    <img src={img} alt="cardimg"/>
    <div className="placecard-box">
      <div className="placecard-box-title">{title}</div>
      <div className="placecard-box-address">{address}</div>
    </div>
  </div>
}

export default PlaceCard;