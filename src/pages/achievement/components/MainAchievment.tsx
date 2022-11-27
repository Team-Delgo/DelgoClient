import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrevArrowBlack from '../../../common/icons/prev-arrow-white.svg';
import { ROOT_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';
import Checked from '../../../common/icons/checked.svg';

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: number;
  name: string;
  registDt: string;
}

function MainAchievment({
  editActivation,
  editRepresentativeAchievementsOn,
  editRepresentativeAchievementsOff,
  mainAchievementList,
  filterRepresentativeAchievements,
}: any) {
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();
  const moveHomePage = () => {
    navigate(ROOT_PATH);
  };

  return (
    <header className="achievement-page-header">
      <img
        src={PrevArrowBlack}
        className="achievement-page-header-prev-arrow"
        alt="achievement-page-prev-arrow"
        aria-hidden="true"
        onClick={moveHomePage}
      />
      <div className="achievement-page-header-achievements">
        <div className="achievement-page-header-achievements-representative">
          <div className="achievement-page-header-achievements-representative-text">{user.nickname}의 대표 업적</div>
          {editActivation === false ? (
            <div
              className="achievement-page-header-achievements-representative-button"
              aria-hidden="true"
              onClick={editRepresentativeAchievementsOn}
            >
              설정
            </div>
          ) : (
            <div
              className="achievement-page-header-achievements-representative-button"
              aria-hidden="true"
              onClick={editRepresentativeAchievementsOff}
            >
              완료
            </div>
          )}
        </div>
        <div className="achievement-page-header-achievements-representative-sub-text">
          최대 3개까지 선택 할 수 있어요
        </div>
        <div className="achievement-page-header-achievements-images">
          {mainAchievementList.map((achievement: AchievementType) => (
            <div
              className="achievement-page-header-achievements-image-container"
              aria-hidden="true"
              onClick={editActivation === true ? filterRepresentativeAchievements(achievement) : undefined}
            >
              <div className="achievement-page-header-achievements-image" key={achievement.achievementsId}>
                <img src={achievement.imgUrl} alt="post-img" />
              </div>
              {editActivation === true ? (
                <img
                  src={Checked}
                  className="achievement-page-header-achievements-image-check-img"
                  alt="post-img"
                  width={20}
                  height={20}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default MainAchievment;
