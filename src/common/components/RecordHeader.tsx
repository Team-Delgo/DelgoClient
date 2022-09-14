import classNames from "classnames";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecordHeader.scss";
import Delgo from "../icons/delgo.svg";

function RecordHeader() {
  const tab = useLocation().state as string || 'photo';
  const [selected, setSeleceted] = useState({
    photo: false,
    calendar: true,
    map: false,
  });
  const navigate = useNavigate();

  const clickHandler = (e: any) => {
    const { id } = e.target;
    console.log(id);
    console.log(tab);
    if(tab === id) return;
    setSeleceted((prev) => {
      const temp = {
        photo: false,
        calendar: false,
        map: false,
      }
      return { ...temp, [id]: true }
    });
    navigate(`/${id}`,{state:id});
  }
  return <div className={classNames("recordHeader-wrapper",{fixed:tab==="calendar"})}>
    <img src={Delgo} alt="logo"/>
    <div className="recordHeader">
      <div aria-hidden="true" id="photo" className={classNames("recordHeader-item", { select: tab==="photo" })} onClick={clickHandler}>사진</div>
      <div aria-hidden="true" id="calendar" className={classNames("recordHeader-item", { select: tab==="calendar" })} onClick={clickHandler}>캘린더</div>
      <div aria-hidden="true" id="map" className={classNames("recordHeader-item", { select: tab==="map" })} onClick={clickHandler}>지도</div>
    </div>
  </div>
}

export default RecordHeader;