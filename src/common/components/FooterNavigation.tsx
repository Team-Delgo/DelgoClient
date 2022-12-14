import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { CAMERA_PATH, RECORD_PATH, ROOT_PATH } from '../constants/path.const';
import './FooterNavigation.scss';
import Home from '../icons/home.svg';
import HomeGray from '../icons/home-gray.svg';
import Plus from '../icons/plus.svg';
import DogFoot from '../icons/dog-foot.svg';
import DogFootGray from '../icons/dog-foot-gray.svg';

function FooterNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const moveToCameraPage = () => {
    setTimeout(() => {
      navigate(CAMERA_PATH.REAR);
    }, 100);
  };

  const moveToHomePage = () => {
    setTimeout(() => {
      navigate(ROOT_PATH);
    }, 100);
  };

  const moveToRecord = () => {
    setTimeout(() => {
      navigate(RECORD_PATH.PHOTO);
    }, 100);
  };

  return (
    <div className="footer">
      <div className="footer-side" aria-hidden="true" onClick={moveToHomePage}>
        <img src={location.pathname === '/' ? Home : HomeGray} alt="home-button" />
        <div className={classNames({ active: location.pathname === '/' })}>홈</div>
      </div>
      <div className="footer-center" aria-hidden="true" onClick={moveToCameraPage}>
        <img src={Plus} alt="plus-button" />
      </div>
      <div className="footer-side" aria-hidden="true" onClick={moveToRecord}>
        <img src={location.pathname !== '/' ? DogFoot : DogFootGray} alt="record-button" />
        <div className={classNames({ active: location.pathname !== '/' })}>내 기록</div>
      </div>
    </div>
  );
}

export default FooterNavigation;
