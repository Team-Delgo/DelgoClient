import React from "react";
import { useNavigate } from 'react-router-dom';
import { CAMERA_PATH, RECORD_PATH, ROOT_PATH } from '../constants/path.const'
import "./FooterNavigation.scss";
import Home from "../icons/home.svg";
import Plus from "../icons/plus.svg";
import DogFoot from "../icons/dog-foot.svg";

function FooterNavigation() {
  const navigate = useNavigate();

  const moveToCameraPage = () => {
    setTimeout(() => {
      navigate(CAMERA_PATH.MAIN);
    }, 100)
  };

  const moveToHomePage = () => {
    setTimeout(() => {
      navigate(ROOT_PATH);
    }, 100)
  }

  const moveToRecord = () => {
    setTimeout(() => {
      navigate(RECORD_PATH.PHOTO);
    }, 100)
  }

  return (
    <div className="footer">
      <div className="footer-side" aria-hidden="true" onClick={moveToHomePage}>
        <img src={Home} alt="home-button" />
      </div>
      <div className="footer-center" aria-hidden="true" onClick={moveToCameraPage}>
        <div className="footer-center-circle">
          <img src={Plus} alt="plus-button" />
        </div>
      </div>
      <div className="footer-side" aria-hidden="true" onClick={moveToRecord}>
        <img src={DogFoot} alt="record-button" />
      </div>
    </div>
  );
}

export default FooterNavigation;