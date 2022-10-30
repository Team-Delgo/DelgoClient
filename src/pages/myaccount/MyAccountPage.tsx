import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterNavigation from '../../common/components/FooterNavigation';
import './MyAccountPage.scss';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function MyAccountPage() {
  const location: any = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="my-account-page">
      <header className="my-account-page-header">
        <body className="my-account-page-header-my-pet">
          <img
            className="my-account-page-header-my-pet-img"
            src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
            alt="copy url"
          />
          <div className="my-account-page-header-my-pet-profie-name">몽자 / 5살</div>
          <div className="my-account-page-header-my-pet-profie-address">서울시 송파구</div>
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
