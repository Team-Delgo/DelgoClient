import React from 'react';
import RightArrow from '../../common/icons/right-arrow.svg';
import './FlagCard.scss';

function FlagCard(props: { place: string, onClick: ()=>void }) {
  const { place, onClick } = props;
  return (
    <div className="flagcard" aria-hidden="true" onClick={onClick}>
      <div className="flagcard-title">{place} 랭킹</div>
      <div className="flagcard-text">
        동네 강아지 활동 순위 보러가기
        <img src={RightArrow} alt="arrow" />
      </div>
    </div>
  );
}

export default FlagCard;
