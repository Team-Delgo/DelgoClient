/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AnyIfEmpty, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTopRankingList, getMyPetRanking } from '../../../common/api/ranking';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { NEIGHBOR_RANKING_PATH } from '../../../common/constants/path.const';
import {
  CACHE_TIME,
  GET_TOP_RANKING_LIST,
  STALE_TIME,
  GET_MY_PET_RANKING_DATA,
} from '../../../common/constants/queryKey.const';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
  name:string;
  profile:string;
}

function Ranking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading: getTopRankingListIsLoading, data: topRankingDataList } = useQuery(
    GET_TOP_RANKING_LIST,
    () => getTopRankingList(101180),
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
    () => getMyPetRanking(1),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const moveToAchievementPage = () => {
    navigate(NEIGHBOR_RANKING_PATH, {
      state: {
        topRankingDataList: topRankingDataList?.data,
        myPetRankingData: myPetRankingData?.data,
      },
    });
  };

  return (
    <div className="home-page-dog-history-body-ranking" aria-hidden="true" onClick={moveToAchievementPage}>
      <div className="home-page-dog-history-body-ranking-title">이번 주 우리 동네 랭킹</div>
      <header className="home-page-dog-history-body-ranking-summary">
        <div className="home-page-dog-history-body-ranking-summary-first-line">
          <div>
            <span className="home-page-dog-history-body-ranking-summary-first-line-dog-name">몽자 /</span>
            <span className="home-page-dog-history-body-ranking-summary-first-line-ranking-number">
              {' '}
              {myPetRankingData?.data.ranking}등
            </span>
          </div>
          <div className="home-page-dog-history-body-ranking-summary-first-line-point">
            {myPetRankingData?.data.weeklyPoint}p
          </div>
        </div>
        <div className="home-page-dog-history-body-ranking-summary-second-line">
          지난 주&nbsp;{myPetRankingData?.data.lastRanking}등
        </div>
      </header>
      <main className="home-page-dog-history-body-ranking-detail">
        {topRankingDataList?.data
          .sort((a: rankingType, b: rankingType) => a.ranking - b.ranking)
          .slice(0, 3)
          .map((rankingData: rankingType) => (
            <div className="home-page-dog-history-body-ranking-detail-container" key={rankingData.userId}>
              <div className="home-page-dog-history-body-ranking-detail-rank">{rankingData.ranking}</div>
              <div className="home-page-dog-history-body-ranking-detail-dog-profile">
                <img src={rankingData.profile} alt="dog-img-url" width={49} height={49} />
                <div className="home-page-dog-history-body-ranking-detail-dog-profile-name-point">
                  <div>{rankingData.name}</div>
                  <div>{rankingData.weeklyPoint}p</div>
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default Ranking;
