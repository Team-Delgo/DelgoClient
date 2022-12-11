/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import NotChecked from '../../../common/icons/not-checked.svg';
import AchievementBottomSheet from '../../../common/utils/AchievementBottomSheet';

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: number;
  name: string;
  registDt: string;
}

interface AchievementPropsType {
  editActivation: boolean;
  achievementList: Array<AchievementType>;
  selectRepresentativeAchievements: (param: AchievementType) => (event: React.MouseEvent) => void;
  achievementListCount: number;
}

function Achievement({
  editActivation,
  achievementList,
  selectRepresentativeAchievements,
  achievementListCount,
}: AchievementPropsType) {
  const [achievementBottomSheetIsOpen, setAchievementBottomSheetIsOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementType>();

  const openBottomSheet = (achievement: AchievementType) => (event: React.MouseEvent) => {
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
      <body className="achievement-page-body">
        <div className="achievement-page-body-achievements-title">내가 획득한 업적</div>
        <div className="achievement-page-body-achievements-count">총 {achievementListCount}개 획득</div>
        <div className="achievement-page-body-achievements-images">
          {achievementList
            .sort((a: AchievementType, b: AchievementType) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1))
            .map((achievement: AchievementType) => (
              <div
                className="achievement-page-body-achievements-image-container"
                aria-hidden="true"
                onClick={
                  editActivation
                    ? achievement.isActive === true
                      ? selectRepresentativeAchievements(achievement)
                      : undefined
                    : undefined
                }
              >
                <div className="achievement-page-body-achievements-image" key={achievement.achievementsId}>
                  <img
                    src={achievement.imgUrl}
                    alt="post-img"
                    width={107}
                    height={143}
                    aria-hidden="true"
                    onClick={editActivation === false ? openBottomSheet(achievement) : undefined}
                  />
                  <div className="achievement-page-body-achievements-image-name">{achievement.name}</div>
                </div>
                {editActivation ? (
                  achievement.isActive ? (
                    <img
                      src={NotChecked}
                      className="achievement-page-body-achievements-image-check-img"
                      alt="post-img"
                      width={20}
                      height={20}
                      aria-hidden="true"
                    />
                  ) : null
                ) : null}
              </div>
            ))}
        </div>
      </body>
      <AchievementBottomSheet
        achievement={selectedAchievement}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={achievementBottomSheetIsOpen}
      />
    </>
  );
}

export default Achievement;
