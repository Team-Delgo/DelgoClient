import React from 'react';
import { useNavigate } from 'react-router-dom';
import AchievementBath from '../../common/icons/achievement-bath.svg';
import AchievementBeauty from '../../common/icons/achievement-beauty.svg';
import AchievementCafe from '../../common/icons/achievement-cafe.svg';
import Point from '../../common/icons/point.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import { CAMERA_PATH, ROOT_PATH } from '../../common/constants/path.const';
import AchievementHospital from '../../common/icons/achievement-hospital.svg';
import AchievementRestorant from '../../common/icons/achievement-restorant.svg';
import AchievementWalk from '../../common/icons/achievement-walk.svg';
import FooterNavigation from '../../common/components/FooterNavigation';
import './AchievementPage.scss';

const achievements = [
  { id: 0, url: AchievementBath },
  { id: 1, url: AchievementBeauty },
  { id: 2, url: AchievementCafe },
  { id: 3, url: AchievementHospital },
  { id: 4, url: AchievementRestorant },
  { id: 5, url: AchievementWalk },
];

function AchievementPage() {
  const navigate = useNavigate();

  const moveHomePage = () => {
    navigate(ROOT_PATH);
  };

  return (
    <>
      <header className="achievement-page-header">
        <img
          src={PrevArrowBlack}
          // className="camera-page-prev-arrow"
          alt="achievement-page-prev-arrow"
          aria-hidden="true"
          onClick={moveHomePage}
        />
        <header className="achievement-page-header-profile">
          <img src={`${process.env.PUBLIC_URL}/assets/dog-img.png`} alt="copy url" />
          <div className="achievement-page-dog-header-profile-detail">
            <div className="achievement-page-header-profile-detail-first">
              <div>서울시 송파구</div>
              <img src={Point} alt="point-img" />
            </div>
            <div className="achievement-page-header-profile-detail-second">
              <div>다크서은</div>
              <div className="achievement-page-header-profile-detail-second-point">12.000P</div>
            </div>
          </div>
        </header>
        <body className="achievement-page-header-achievements">
          <div className="achievement-page-header-achievements-representative">
            <div className="achievement-page-header-achievements-representative-text">몽자의 대표 업적</div>
            <div className="achievement-page-header-achievements-representative-button">등록/수정</div>
          </div>
          <div className="achievement-page-header-achievements-representative-sub-text">
            최대 3개의 업적을 대표업적으로 선정 할 수 있어요!
          </div>
          <div className="achievement-page-header-achievements-images">
            {achievements.slice(0, 3).map((achievement) => (
              <div className="achievement-page-header-achievements-image" key={achievement.id}>
                <img src={achievement.url} alt="post-img" />
              </div>
            ))}
          </div>
        </body>
      </header>
      <body className="achievement-page-body">
        <div className="achievement-page-body-achievements-title">내가 획득한 업적</div>
        <div className="achievement-page-body-achievements-images">
          {achievements.map((achievement) => (
            <div className="achievement-page-body-achievements-image" key={achievement.id}>
              <img src={achievement.url} alt="post-img" />
            </div>
          ))}
        </div>
      </body>
      <FooterNavigation />
    </>
  );
}

export default AchievementPage;
