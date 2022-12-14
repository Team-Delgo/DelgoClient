import React, { useEffect, useState } from 'react';
import { useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
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
import { analytics } from '../../../index';
import { RootState } from '../../../redux/store';
import { rankingType } from '../../../common/types/ranking';


function Ranking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.persist.user);
  const rankingEvent = useAnalyticsCustomLogEvent(analytics, 'home_ranking');

  const { isLoading: getTopRankingListIsLoading, data: topRankingDataList } = useQuery(
    GET_TOP_RANKING_LIST,
    () => getTopRankingList(Number(user.geoCode)),
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

  const moveToNeighborRankingPage = () => {
    rankingEvent.mutate();
    navigate(NEIGHBOR_RANKING_PATH, {
      state: {
        topRankingDataList: topRankingDataList?.data,
        myPetRankingData: myPetRankingData?.data,
      },
    });
  };

  return (
    <>
      <div className="home-page-dog-history-body-ranking">
        <div className="home-page-dog-history-body-ranking-header">
          <div className="home-page-dog-history-body-ranking-header-title">?????? ??? ?????? ?????? ??????</div>
          <div
            className="home-page-dog-history-body-ranking-header-all"
            aria-hidden="true"
            onClick={moveToNeighborRankingPage}
          >
            ?????????
          </div>
        </div>
        <header className="home-page-dog-history-body-ranking-summary">
          <div className="home-page-dog-history-body-ranking-summary-first">
            <div className="home-page-dog-history-body-ranking-summary-first-ranking">
              {myPetRankingData?.data?.ranking}
            </div>
            <div className="home-page-dog-history-body-ranking-summary-first-name">{user.nickname}</div>
            <div className="home-page-dog-history-body-ranking-summary-first-last-ranking">
              ?????? ???&nbsp;{myPetRankingData?.data?.lastRanking}???
            </div>
          </div>
          <div className="home-page-dog-history-body-ranking-summary-point">{myPetRankingData?.data?.weeklyPoint}p</div>
          {/* <div className="home-page-dog-history-body-ranking-summary-first-line">
            <div>
              <span className="home-page-dog-history-body-ranking-summary-first-line-dog-name">{user.nickname} /</span>
              <span className="home-page-dog-history-body-ranking-summary-first-line-ranking-number">
                {' '}
                {myPetRankingData?.data?.ranking}???
              </span>
            </div>
            <div className="home-page-dog-history-body-ranking-summary-first-line-point">
              {myPetRankingData?.data?.weeklyPoint}p
            </div>
          </div>
          <div className="home-page-dog-history-body-ranking-summary-second-line">
            ?????? ???&nbsp;{myPetRankingData?.data?.lastRanking}???
          </div> */}
        </header>
        <main className="home-page-dog-history-body-ranking-detail">
          {topRankingDataList?.data
            .sort((a: rankingType, b: rankingType) => a.ranking - b.ranking)
            .slice(0, 3)
            .map((rankingData: rankingType) => (
              <div className="home-page-dog-history-body-ranking-detail-container" key={rankingData.userId}>
                <div className="home-page-dog-history-body-ranking-detail-rank">{rankingData.ranking}</div>
                <div className="home-page-dog-history-body-ranking-detail-dog-profile">
                  <img src={rankingData.profile} alt="dog-img-url" />
                  <div className="home-page-dog-history-body-ranking-detail-dog-profile-name-point">
                    <div className="dog-name">{rankingData.name}</div>
                    <div className="dog-point">{rankingData.weeklyPoint}p</div>
                  </div>
                </div>
              </div>
            ))}
        </main>
      </div>
      <div className="border-line" />
    </>
  );
}

export default Ranking;
