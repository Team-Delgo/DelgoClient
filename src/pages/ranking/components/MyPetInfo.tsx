import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import PrevArrowBlack from '../../../common/icons/prev-arrow-black.svg';

function MyPetInfo() {
  const navigate = useNavigate();
  const { user, pet } = useSelector((state: RootState) => state.persist.user);
  const moveToHomePage = () => {
    navigate(-1);
  };
  return (
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
  );
}

export default MyPetInfo;
