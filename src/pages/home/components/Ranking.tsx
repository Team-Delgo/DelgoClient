import React from 'react';
import { useQuery } from 'react-query';
import { AnyIfEmpty } from 'react-redux';
import { getTopRankingList } from '../../../common/api/ranking';
import { CACHE_TIME, GET_TOP_RANKING_LIST, STALE_TIME } from '../../../common/constants/queryKey.const';


interface rankingType {
  geoCode: string
  ranking: number
  userId: number
  weeklyPoint: number
}


const ranking = [
  {
    img: `${process.env.PUBLIC_URL}/assets/dog-img.png`,
    name: '감자',
    id: 1,
    point: 1000,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/dog-img.png`,
    name: '오이',
    id: 2,
    point: 500,
  },
  {
    img: `${process.env.PUBLIC_URL}/assets/dog-img.png`,
    name: '수박',
    id: 1,
    point: 200,
  },
];

function Ranking() {
  const { isLoading: getTopRankingListIsLoading, data: topRankingDataList } = useQuery(
    GET_TOP_RANKING_LIST,
    () => getTopRankingList(101000),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      //   onError: (error: any) => {
      //     useErrorHandlers(dispatch, error);
      //   },
    },
  );
  return (
    <div className="home-page-dog-history-body-ranking">
      <div className="home-page-dog-history-body-ranking-title">9월 첫째 주 석차</div>
      <header className="home-page-dog-history-body-ranking-summary">
        <div className="home-page-dog-history-body-ranking-summary-first-line">
          <div>
            <span className="home-page-dog-history-body-ranking-summary-first-line-dog-name">몽자 /</span>
            <span className="home-page-dog-history-body-ranking-summary-first-line-ranking-number"> 124등</span>
          </div>
          <div className="home-page-dog-history-body-ranking-summary-first-line-point">1584p</div>
        </div>
        <div className="home-page-dog-history-body-ranking-summary-second-line">지난 주 129등</div>
      </header>
      <main className="home-page-dog-history-body-ranking-detail">
        {topRankingDataList?.data
          .sort((a: rankingType, b: rankingType) =>
            a.ranking - b.ranking
          )
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
