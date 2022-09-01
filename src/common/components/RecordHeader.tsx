import classNames from "classnames";
import React, { useState } from "react";
import "./RecordHeader.scss";
import Delgo from "../icons/delgo.svg";

function RecordHeader() {
  const [selected, setSeleceted] = useState({
    photo: false,
    calendar: true,
    map: false,
  });

  const clickHandler = (e: any) => {
    const { id } = e.target;
    setSeleceted((prev) => {
      const temp = {
        photo: false,
        calendar: false,
        map: false,
      }
      return { ...temp, [id]: true }
    })
  }
  return <div className="recordHeader-wrapper">
    <img src={Delgo} alt="logo"/>
    <div className="recordHeader">
      <div aria-hidden="true" id="photo" className={classNames("recordHeader-item", { select: selected.photo })} onClick={clickHandler}>사진</div>
      <div aria-hidden="true" id="calendar" className={classNames("recordHeader-item", { select: selected.calendar })} onClick={clickHandler}>캘린더</div>
      <div aria-hidden="true" id="map" className={classNames("recordHeader-item", { select: selected.map })} onClick={clickHandler}>지도</div>
    </div>
  </div>
}

export default RecordHeader;