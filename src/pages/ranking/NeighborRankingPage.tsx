import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FooterNavigation from '../../common/components/FooterNavigation';
import './NeighborRankingPage.scss';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function NeighborRankingPage() {
  const location: any = useLocation();
  useEffect(() => {
    console.log(location.state?.topRankingDataList);
    console.log(location.state?.myPetRankingData);
  }, []);
  return (
    <>
      <div className="neighbor-ranking-page">
        <header className="neighbor-ranking-page-header">
          <header className="neighbor-ranking-page-header-title">우리동네 랭킹</header>
          <body className="neighbor-ranking-page-header-my-pet">
            <img
              className="neighbor-ranking-page-header-my-pet-img"
              src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
              alt="copy url"
            />
            <div className="neighbor-ranking-page-header-my-pet-profie">
              <div className="neighbor-ranking-page-header-my-pet-profie-address">서울시 송파구</div>
              <div className="neighbor-ranking-page-header-my-pet-profie-name">몽자</div>
            </div>
          </body>
        </header>
        <body className="neighbor-ranking-page-body" style={neighborRankingPageBodyStyle}>
          <header className="neighbor-ranking-page-body-my-pet">
            <div className="neighbor-ranking-page-body-my-pet-first">
              <div className="neighbor-ranking-page-body-my-pet-first-ranking">123</div>
              <img
                className="neighbor-ranking-page-body-my-pet-first-img"
                src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
                alt="copy url"
              />
              <div className="neighbor-ranking-page-body-my-pet-first-name">몽자</div>
            </div>
            <div className="neighbor-ranking-page-body-my-pet-point">12345 p</div>
          </header>
          {location.state?.topRankingDataList?.map((rangker: rankingType) => (
            <body className="neighbor-ranking-page-body-pet">
              <div className="neighbor-ranking-page-body-pet-first">
                <div className="neighbor-ranking-page-body-pet-first-ranking">{rangker.ranking}</div>
                <img
                  className="neighbor-ranking-page-body-pet-first-img"
                  src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
                  alt="copy url"
                />
                <div className="neighbor-ranking-page-body-pet-first-name">감자</div>
              </div>
              <div className="neighbor-ranking-page-body-pet-point">{rangker.weeklyPoint} p</div>
            </body>
          ))}
        </body>
      </div>
      <FooterNavigation />
    </>
  );
}

export default NeighborRankingPage;
