import React from 'react';
import Point from '../../../common/icons/point.svg'
import AchievementBath from '../../../common/icons/achievement-bath.svg'
import AchievementBeauty from '../../../common/icons/achievement-beauty.svg'
import AchievementCafe from '../../../common/icons/achievement-cafe.svg'
import AchievementHospital from '../../../common/icons/achievement-hospital.svg'
import AchievementRestorant from '../../../common/icons/achievement-restorant.svg'
import AchievementWalk from '../../../common/icons/achievement-walk.svg'
import DelgoWhite from '../../../common/icons/delgo-white.svg'

function Profile() {
  return (
    <header className="home-page-dog-history-header">
      <img className="home-page-dog-history-header-logo"src={DelgoWhite} alt="copy url" />
      <header className="home-page-dog-history-header-profile">
        <img src={`${process.env.PUBLIC_URL}/assets/dog-img.png`} alt="copy url" />
        <div className="home-page-dog-history-header-profile-detail">
          <div className="home-page-dog-history-header-profile-detail-first">서울시 송파구</div>
          <div className="home-page-dog-history-header-profile-detail-second">
            <div>다크서은</div>
            <img src={Point} alt="point-img" />
          </div>
          <div className="home-page-dog-history-header-profile-detail-third">
            <div>2022.09.27</div>
            <div className="home-page-dog-history-header-profile-detail-third-point">12.000P</div>
          </div>
        </div>
      </header>
      <body className="home-page-dog-history-header-achievements">
        <div>몽자의 대표 업적</div>
        <div className="home-page-dog-history-header-achievements-images">
          <img src={AchievementBath} alt="bath-img" />
          <img src={AchievementBeauty} alt="beauty-img" />
          <img src={AchievementCafe} alt="cafe-img" />
          {/* <img src={AchievementHospital} alt="hospital-img" />
          <img src={AchievementRestorant} alt="restorant-img" />
          <img src={AchievementWalk} alt="walk-img" /> */}
        </div>
      </body>
    </header>
  );
}

export default Profile;
