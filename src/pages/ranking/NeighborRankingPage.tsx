import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import './NeighborRankingPage.scss';
import { RootState } from '../../redux/store';
import {analytics} from "../../index";

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
  profile:string;
  name:string;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function NeighborRankingPage() {
  const location: any = useLocation();
  const navigate = useNavigate();
  const {user,pet} = useSelector((state: RootState) => state.persist.user);
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");
  
  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: "NeighborRanking",
        firebase_screen_class: "NeighborRankingPage"
      }
    });
    window.scroll(0, 0);
  }, []);


  const moveToHomePage = () => {
    navigate(-1);
  };

  return (
    <div className="neighbor-ranking-page">
      <header className="neighbor-ranking-page-header">
        <header className="neighbor-ranking-page-header-title">우리동네 랭킹</header>
        <img
          src={PrevArrowBlack}
          className="neighbor-ranking-page-prev-arrow"
          alt="neighbor-ranking-page-prev-arrow"
          aria-hidden="true"
          onClick={moveToHomePage}
        />
        <body className="neighbor-ranking-page-header-my-pet">
          <img className="neighbor-ranking-page-header-my-pet-img" src={pet.image} alt="copy url" />
          <div className="neighbor-ranking-page-header-my-pet-profie">
            <div className="neighbor-ranking-page-header-my-pet-profie-address">{user.address}</div>
            <div className="neighbor-ranking-page-header-my-pet-profie-name">{user.nickname}</div>
          </div>
        </body>
      </header>
      <body className="neighbor-ranking-page-body" style={neighborRankingPageBodyStyle}>
        <header className="neighbor-ranking-page-body-my-pet">
          <div className="neighbor-ranking-page-body-my-pet-first">
            <div className="neighbor-ranking-page-body-my-pet-first-ranking">
              {location.state?.myPetRankingData?.ranking}
            </div>
            <img className="neighbor-ranking-page-body-my-pet-first-img" src={pet.image} alt="copy url" />
            <div className="neighbor-ranking-page-body-my-pet-first-name">{user.nickname}</div>
          </div>
          <div className="neighbor-ranking-page-body-my-pet-point">
            {location.state?.myPetRankingData?.weeklyPoint} p
          </div>
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
    </div>
  );
}

export default NeighborRankingPage;
