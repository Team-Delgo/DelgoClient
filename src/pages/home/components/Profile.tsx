import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import Point from '../../../common/icons/point.svg';
import AchievementHospital from '../../../common/icons/achievement-hospital.svg';
import DelgoWhite from '../../../common/icons/delgo-white.svg';
import RightArrow from '../../../common/icons/right-arrow.svg';
import { ACHIEVEMENT_PATH, MY_ACCOUNT_PATH } from '../../../common/constants/path.const';
import { getMyPoint } from '../../../common/api/point';
import { getAchievementList, getAchievementListByMain } from '../../../common/api/achievement';
import {
  CACHE_TIME,
  GET_ACHIEVEMENT_LIST,
  GET_MY_PET_RANKING_DATA,
  STALE_TIME,
  GET_MY_POINT_DATA,
} from '../../../common/constants/queryKey.const';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { getMyPetRanking } from '../../../common/api/ranking';
import { RootState } from '../../../redux/store';


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
  const [todayDate, SetTodayDate] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,pet} = useSelector((state: RootState) => state.persist.user);

  useEffect(() => {
    getTodayDateStr();
  }, []);

  const { isLoading: getMyPointDataIsLoading, data: myPointData } = useQuery(
    GET_MY_POINT_DATA,
    () => getMyPoint(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    console.log(myPointData)
  }, [getMyPointDataIsLoading]);

  const { isLoading: getAchievementListIsLoading, data: ahievementList } = useQuery(
    GET_ACHIEVEMENT_LIST,
    () => getAchievementListByMain(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const { isLoading: getMyPetRankingDataIsLoading, data: myPetRankingData } = useQuery(
    GET_MY_PET_RANKING_DATA,
    () => getMyPetRanking(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const getTodayDateStr = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const fullDate = `${year}.${month}.${date}`;
    SetTodayDate(fullDate);
  };

  const moveToAchievementPage = () => {
    navigate(ACHIEVEMENT_PATH, {
      state: {
        rankingPoint: myPointData?.data?.accumulatedPoint
      },
    });
  };

  const moveToMyAccountPage = () => {
    navigate(MY_ACCOUNT_PATH.MAIN);
  };

  return (
    <header className="home-page-dog-history-header">
      <img className="home-page-dog-history-header-logo" src={DelgoWhite} alt="copy url" />
      <header className="home-page-dog-history-header-profile" aria-hidden="true" onClick={moveToMyAccountPage}>
        <img
          className="home-page-dog-history-header-profile-img"
          src={pet.image}
          alt="copy url"
          width={72}
          height={72}
        />
        <div className="home-page-dog-history-header-profile-detail">
          <div className="home-page-dog-history-header-profile-detail-first">{user.address}</div>
          <div className="home-page-dog-history-header-profile-detail-second">
            <div className="home-page-dog-history-header-profile-detail-second-name">{user.nickname}</div>
            <img src={Point} alt="point-img" />
          </div>
          <div className="home-page-dog-history-header-profile-detail-third">
            <div>{todayDate}</div>
            <div className="home-page-dog-history-header-profile-detail-third-point">
              {myPointData?.data?.accumulatedPoint}
            </div>
          </div>
        </div>
      </header>
      <body className="home-page-dog-history-header-achievements">
        <div aria-hidden="true" onClick={moveToAchievementPage}>
          <span>{user.nickname}의 대표 업적&nbsp;</span>
          <img
            className="home-page-dog-history-header-achievements-right-arrow-img"
            src={RightArrow}
            alt="right-arrow-img"
          />
        </div>
        {getAchievementListIsLoading ? (
          <div className="loading-spinning-circles">
            <SpinningCircles />
          </div>
        ) : (
          <div className="home-page-dog-history-header-achievements-images">
            {ahievementList?.data
              .filter((ahievement: AchievementDataType) => ahievement.isMain > 0)
              .sort((a: AchievementDataType, b: AchievementDataType) => {
                return a.isMain - b.isMain;
              })
              .map((achievement: AchievementDataType) => (
                <img src={achievement.achievements.imgUrl} alt="bath-img" />
              ))}
          </div>
        )}
      </body>
    </header>
  );
}

export default Profile;
