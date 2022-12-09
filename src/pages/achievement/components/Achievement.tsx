/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React from 'react';
import NotChecked from '../../../common/icons/not-checked.svg';

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: number;
  name: string;
  registDt: string;
}

function Achievement({ editActivation, achievementList, selectRepresentativeAchievements,achievementListCount }: any) {

  console.log('achievementList',achievementList)
  return (
    <body className="achievement-page-body">
      <div className="achievement-page-body-achievements-title">내가 획득한 업적</div>
      <div className="achievement-page-body-achievements-count">
        총 {achievementListCount}개 획득
      </div>
      <div className="achievement-page-body-achievements-images">
        {achievementList
          .sort((a: AchievementType, b: AchievementType) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1))
          .map((achievement: AchievementType) => (
            <div
              className="achievement-page-body-achievements-image-container"
              aria-hidden="true"
              onClick={achievement.isActive === true ? selectRepresentativeAchievements(achievement) : undefined}
            >
              <div className="achievement-page-body-achievements-image" key={achievement.achievementsId}>
                <img src={achievement.imgUrl} alt="post-img" width={107} height={143} />
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
                  />
                ) : null
              ) : null}
            </div>
          ))}
      </div>
    </body>
  );
}

export default Achievement;
