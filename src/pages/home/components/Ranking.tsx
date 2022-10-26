/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AnyIfEmpty, useDispatch } from 'react-redux';
import { getTopRankingList,getMyPetRanking } from '../../../common/api/ranking';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { CACHE_TIME, GET_TOP_RANKING_LIST, STALE_TIME,GET_MY_PET_RANKING_DATA } from '../../../common/constants/queryKey.const';


interface rankingType {
  geoCode: string
  ranking: number
  userId: number
  weeklyPoint: number
}


const weekNumCode: weekNumCodeType = {
  1: '첫째',
  2: '둘째',
  3: '셋째',
  4: '넷째',
  5: '다섯째',
};

interface weekNumCodeType {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  [prop: string]: any;
}


function Ranking() {
  const [todayMonthNum,setTodayMonthNum] = useState(0)
  const [todayWeekNum,setTodayWeekNum] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    getTodayDateStr()
  },[])

  const { isLoading: getTopRankingListIsLoading, data: topRankingDataList } = useQuery(
    GET_TOP_RANKING_LIST,
    () => getTopRankingList(101000),
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
  
  const getTodayDateStr = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const fullDate = `${year}-${month}-${date}`;
    setTodayMonthNum(month);
    getWeekNo(fullDate);
  };

  function getWeekNo(dateStr: string) {
    let date = new Date();
    if (dateStr) {
      date = new Date(dateStr);
    }
    setTodayWeekNum(Math.ceil(date.getDate() / 7));
  }

  return (
    <div className="home-page-dog-history-body-ranking">
      <div className="home-page-dog-history-body-ranking-title">{todayMonthNum}월 {weekNumCode[todayWeekNum]} 주 석차</div>
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
          지난 주 {myPetRankingData?.data.lastRanking}등
        </div>
      </header>
      <main className="home-page-dog-history-body-ranking-detail">
        {topRankingDataList?.data
          .sort((a: rankingType, b: rankingType) => a.ranking - b.ranking)
          .map((rankingData: rankingType) => (
            <div className="home-page-dog-history-body-ranking-detail-container" key={rankingData.userId}>
              <div className="home-page-dog-history-body-ranking-detail-rank">{rankingData.ranking}</div>
              <div className="home-page-dog-history-body-ranking-detail-dog-profile">
                {/* <img src={data.img} alt="dog-img-url" /> */}
                <div className="home-page-dog-history-body-ranking-detail-dog-profile-name-point">
                  {/* <div>{data.name}</div> */}
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
