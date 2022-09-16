import React from 'react'

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
        {ranking.map((data, index) => (
          <div className="home-page-dog-history-body-ranking-detail-container" key={data.id}>
            <div className="home-page-dog-history-body-ranking-detail-rank">{index + 1}</div>
            <div className="home-page-dog-history-body-ranking-detail-dog-profile">
              <img src={data.img} alt="dog-img-url" />
              <div className="home-page-dog-history-body-ranking-detail-dog-profile-name-point">
                <div>{data.name}</div>
                <div>{data.point}p</div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Ranking