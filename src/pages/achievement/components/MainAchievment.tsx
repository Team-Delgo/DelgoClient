import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrevArrowBlack from '../../../common/icons/prev-arrow-white.svg';
import { ROOT_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';
import Checked from '../../../common/icons/checked.svg';
import { achievementType } from '../../../common/types/achievement';


interface mainAchievmentPropsType {
  editActivation: boolean;
  editRepresentativeAchievementsOn: () => void;
  editRepresentativeAchievementsOff: () => void;
  mainAchievementList: Array<achievementType>;
  filterRepresentativeAchievements: (param: achievementType) => (event: React.MouseEvent) => void;
  openBottomSheet: (param: achievementType) => (event: React.MouseEvent) => void;
}

function MainAchievment({
  editActivation,
  editRepresentativeAchievementsOn,
  editRepresentativeAchievementsOff,
  mainAchievementList,
  filterRepresentativeAchievements,
  openBottomSheet,
}: mainAchievmentPropsType) {
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();


  console.log('mainAchievementList',mainAchievementList)

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
        <div className="achievement-page-header-achievements-representative-sub-text">최대 3개까지 선택 할 수 있어요</div>
        <div className="achievement-page-header-achievements-images">
          {mainAchievementList.map((achievement: achievementType) => (
            <div
              className="achievement-page-header-achievements-image-container"
              aria-hidden="true"
              onClick={editActivation === true ? filterRepresentativeAchievements(achievement) : undefined}
            >
              <div className="achievement-page-header-achievements-image" key={achievement.achievementsId}>
                <div>
                  <img
                    src={achievement.imgUrl}
                    alt="post-img"
                    width={103}
                    height={113}
                    aria-hidden="true"
                    onClick={editActivation === false ? openBottomSheet(achievement) : undefined}
                  />
                  <div className="achievement-page-header-achievements-image-name">{achievement.name}</div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default MainAchievment;
