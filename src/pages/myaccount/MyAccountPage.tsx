import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import './MyAccountPage.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import RightArrow from '../../common/icons/right-arrow.svg';
import DogFoot from "../../common/icons/dog-foot-button.svg";

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function MyAccountPage() {
  const navigate = useNavigate();
  const pet = useSelector((state: any) => state.persist.user.pet);
  const { name, image } = pet;
  const location: any = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="my-account-page">
      <img
        aria-hidden="true"
        className="my-account-page-back"
        src={LeftArrow}
        alt="back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="my-account-page-title">내 정보</div>
      <header className="my-account-page-header">
        <body className="my-account-page-header-my-pet">
          <img
            className="my-account-page-header-my-pet-img"
            src={image}
            alt="copy url"
          />
          <div className="my-account-page-header-my-pet-profile">
            <div className="my-account-page-header-my-pet-profile-name">
              {name}
              <img src={DogFoot} alt="right" />
            </div>
            <div className="my-account-page-header-my-pet-profile-address">서울시 송파구</div>
            <div className="my-account-page-header-my-pet-profile-date">기록시작 2020.10.11</div>
          </div>
        </body>
      </header>
      <body className="my-account-page-body" style={neighborRankingPageBodyStyle}>
        <div className='my-account-page-body-item'>내정보 관리<img src={RightArrow} alt="more" /></div>
        <div className='my-account-page-body-item'>설정<img src={RightArrow} alt="more" /></div>
        <div className='my-account-page-body-item'>문의<img src={RightArrow} alt="more" /></div>
        <div className='my-account-page-body-item'>
          <div className='my-account-page-body-item-wrapper'>
            <div className='my-account-page-body-item-wrapper-title'>문의</div>
            <div className='my-account-page-body-item-wrapper-sub'>카카오 플러스친구로 이동</div>
          </div>
          <img src={RightArrow} alt="more" />
        </div>
      </body>
      <FooterNavigation />
    </div>
  );
}

export default MyAccountPage;
