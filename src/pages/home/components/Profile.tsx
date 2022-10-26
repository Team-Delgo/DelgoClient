import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  SpinningCircles,
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  TailSpin,
  ThreeDots,
} from 'react-loading-icons';
import Point from '../../../common/icons/point.svg';
import AchievementHospital from '../../../common/icons/achievement-hospital.svg';
import DelgoWhite from '../../../common/icons/delgo-white.svg';
import RightArrow from '../../../common/icons/right-arrow.svg';
import { ACHIEVEMENT_PATH } from '../../../common/constants/path.const';
import { getAchievementList, getAchievementListByMain } from '../../../common/api/achievement';
import { CACHE_TIME, GET_ACHIEVEMENT_LIST, STALE_TIME } from '../../../common/constants/queryKey.const';

interface AchievementDataType {
  achievements: AchievementType;
  achievementsId: number;
  archiveId: number;
  isMain: number;
  registDt: string;
  userId: number;
}

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isMain: string;
  isMungple: number;
  name: string;
  registDt: string;
}

function Profile() {
  const navigate = useNavigate();

  const { isLoading: getAchievementListIsLoading, data: ahievementList } = useQuery(
    GET_ACHIEVEMENT_LIST,
    () => getAchievementListByMain(1),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      //   onError: (error: any) => {
      //     useErrorHandlers(dispatch, error);
      //   },
    },
  );

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
            <div className="home-page-dog-history-header-profile-detail-third-point">12.000 P</div>
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
          {getAchievementListIsLoading ? (
            <div className="loading-spinning-circles">
              <SpinningCircles />
            </div>
          ) : (
            ahievementList?.data
              .filter((ahievement: AchievementDataType) => ahievement.isMain > 0)
              .map((ahievement: AchievementDataType) => <img src={AchievementHospital} alt="bath-img" />)
          )}
        </div>
      </body>
    </header>
  );
}

export default Profile;
