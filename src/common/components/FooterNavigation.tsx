import React from "react";
import "./FooterNavigation.scss";
import Home from "../icons/home.svg";
import Plus from "../icons/plus.svg";
import DogFoot from "../icons/dog-foot.svg";

function FooterNavigation() {
  return <div className="footer">
    <div className="footer-side">
      <img src={Home} alt="home-button" />
    </div>
    <div className="footer-center">
      <div className="footer-center-circle">
        <img src={Plus} alt="plus-button" />
      </div>
    </div>
    <div className="footer-side">
      <img src={DogFoot} alt="record-button" />
    </div>
  </div>
}

export default FooterNavigation;