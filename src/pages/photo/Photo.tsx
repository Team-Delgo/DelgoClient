import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import FooterNavigation from '../../common/components/FooterNavigation';
import RecordHeader from '../../common/components/RecordHeader';
import './Photo.scss';
import Cafe from '../../common/icons/cafe.svg';
import Walk from '../../common/icons/walk.svg';
import Hair from '../../common/icons/beauty.svg';
import Hospital from '../../common/icons/hospital.svg';
import Bath from '../../common/icons/bath.svg';
import UnderArrow from '../../common/icons/under-arrow.svg';

function Photo() {
  const [photos, setPhotos] = useState([]);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [sortOption, setSortOption] = useState('최신순');
  // useEffect(()=>{
  // },[]);

  const optionClickHandler = (e: any) => {
    setSortOption(e.target.textContent);
    setButtonIsClicked(false);
  };

  return (
    <div className="photo">
      <RecordHeader />
      <FooterNavigation />
      <div className="photo-history">몽자의 히스토리</div>
      <div className="photo-category">
        <div aria-hidden="true" className="photo-category-button item">
          <img src={Walk} alt="walk" />
          <span>산책 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item">
          <img src={Cafe} alt="walk" />
          <span>카페 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item">
          <img src={Hair} alt="walk" />
          <span>미용 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item">
          <img src={Bath} alt="walk" />
          <span>목욕 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item">
          <img src={Hospital} alt="walk" />
          <span>병원 {10}회</span>
        </div>
      </div>
      <div className="photo-select">
        <button
          className="photo-sort"
          type="button"
          onClick={() => {
            setButtonIsClicked(!buttonIsClicked);
          }}
        >
          <div>{sortOption}</div>
          <img src={UnderArrow} alt="under-arrow" />
        </button>
        {buttonIsClicked && (
          <ul className={classNames('photo-ul', { visible: buttonIsClicked })}>
            <li aria-hidden="true" value="최신순" onClick={optionClickHandler}>
              최신순
            </li>
            <li aria-hidden="true" value="오래된순" onClick={optionClickHandler}>
              오래된순
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Photo;
