import React from 'react';
import { useNavigate } from 'react-router-dom';
import Point from '../../../common/icons/point.svg'
import AchievementBath from '../../../common/icons/achievement-bath.svg'
import AchievementBeauty from '../../../common/icons/achievement-beauty.svg'
import AchievementCafe from '../../../common/icons/achievement-cafe.svg'
import AchievementHospital from '../../../common/icons/achievement-hospital.svg'
import AchievementRestorant from '../../../common/icons/achievement-restorant.svg'
import AchievementWalk from '../../../common/icons/achievement-walk.svg'
import DelgoWhite from '../../../common/icons/delgo-white.svg'
import RightArrow from '../../../common/icons/right-arrow.svg'
import { ACHIEVEMENT_PATH } from '../../../common/constants/path.const';

function Profile() {
  const navigate = useNavigate();

  const moveToPostsPage = () => {
    navigate(ACHIEVEMENT_PATH);
  };


  return (
    <header className="home-page-dog-history-header">
      <img className="home-page-dog-history-header-logo" src={DelgoWhite} alt="copy url" />
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
        <div aria-hidden="true" onClick={moveToPostsPage}>
          <span>몽자의 대표 업적&nbsp;</span>
          <img
            className="home-page-dog-history-header-achievements-right-arrow-img"
            src={RightArrow}
            alt="right-arrow-img"
          />
        </div>
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
