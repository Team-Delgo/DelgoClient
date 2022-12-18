import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../redux/store';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
  profile: string;
  name: string;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function RankingList() {
  const location: any = useLocation();
  const { user, pet } = useSelector((state: RootState) => state.persist.user);
  return (
    <body className="neighbor-ranking-page-body" style={neighborRankingPageBodyStyle}>
      <header className="neighbor-ranking-page-body-my-pet">
        <div className="neighbor-ranking-page-body-my-pet-first">
          <div className="neighbor-ranking-page-body-my-pet-first-ranking">
            {location.state?.myPetRankingData?.ranking}
          </div>
          <img className="neighbor-ranking-page-body-my-pet-first-img" src={pet.image} alt="copy url" />
          <div className="neighbor-ranking-page-body-my-pet-first-name">{user.nickname}</div>
        </div>
        <div className="neighbor-ranking-page-body-my-pet-point">{location.state?.myPetRankingData?.weeklyPoint} p</div>
      </header>
      {location.state?.topRankingDataList?.map((rangker: rankingType) => (
        <body className="neighbor-ranking-page-body-pet">
          <div className="neighbor-ranking-page-body-pet-first">
            <div className="neighbor-ranking-page-body-pet-first-ranking">{rangker.ranking}</div>
            <img className="neighbor-ranking-page-body-pet-first-img" src={rangker.profile} alt="copy url" />
            <div className="neighbor-ranking-page-body-pet-first-name">{rangker.name}</div>
          </div>
          <div className="neighbor-ranking-page-body-pet-point">{rangker.weeklyPoint} p</div>
        </body>
      ))}
    </body>
  );
}

export default RankingList;
