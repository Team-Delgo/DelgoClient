import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterNavigation from '../../common/components/FooterNavigation';
import './MyAccountPage.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import RightArrow from '../../common/icons/right-arrow-gray.svg';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function MyAccountPage() {
  const navigate = useNavigate();
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
            src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
            alt="copy url"
          />
          <div className="my-account-page-header-my-pet-profile">
            <div className="my-account-page-header-my-pet-profile-name">
              몽자
              <img src={RightArrow} alt="right" />
            </div>
            <div className="my-account-page-header-my-pet-profile-address">서울시 송파구</div>
            <div className="my-account-page-header-my-pet-profile-date">기록시작 2020.10.11</div>
          </div>
        </body>
      </header>
      <body className="my-account-page-body" style={neighborRankingPageBodyStyle}>
        <div>내정보 관리</div>
        <div>설정</div>
        <div>문의</div>
        <div>카카오 플러스친구로 이동</div>
      </body>
    </div>
  );
}

export default MyAccountPage;
