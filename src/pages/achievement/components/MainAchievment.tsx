import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrevArrowBlack from '../../../common/icons/prev-arrow-white.svg';
import { ROOT_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';
import Checked from '../../../common/icons/checked.svg';
import AchievementBottomSheet from '../../../common/utils/AchievementBottomSheet';

interface achievementType {
  achievementsId: number;
  desc: string;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: boolean;
  name: string;
  registDt: string;
}

interface mainAchievmentType {
  editActivation: boolean;
  editRepresentativeAchievementsOn: () => void;
  editRepresentativeAchievementsOff: () => void;
  mainAchievementList: Array<achievementType>;
  filterRepresentativeAchievements: (param: achievementType) => (event: React.MouseEvent) => void;
}

function MainAchievment({
  editActivation,
  editRepresentativeAchievementsOn,
  editRepresentativeAchievementsOff,
  mainAchievementList,
  filterRepresentativeAchievements,
}: mainAchievmentType) {
  const [achievementBottomSheetIsOpen, setAchievementBottomSheetIsOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<achievementType>();
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();

  const moveHomePage = () => {
    navigate(ROOT_PATH);
  };

  const openBottomSheet = (achievement: achievementType) => (event: React.MouseEvent) => {
    setSelectedAchievement(achievement);
    setTimeout(() => {
      setAchievementBottomSheetIsOpen(true);
    }, 200);
  };

  const closeBottomSheet = () => {
    setAchievementBottomSheetIsOpen(false);
  };

  return (
    <>
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
      <AchievementBottomSheet
        text=""
        allView={false}
        achievement={selectedAchievement}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={achievementBottomSheetIsOpen}
      />
    </>
  );
}

export default MainAchievment;
