import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import FooterNavigation from '../../common/components/FooterNavigation';
import RecordHeader from '../../common/components/RecordHeader';
import './Photo.scss';
import Cafe from '../../common/icons/cafe.svg';
import Walk from '../../common/icons/walk.svg';
import Hair from '../../common/icons/beauty.svg';
import Hospital from '../../common/icons/hospital.svg';
import Bath from '../../common/icons/bath.svg';
import Eat from "../../common/icons/eat.svg";
import UnderArrow from '../../common/icons/under-arrow.svg';
import { Cert } from '../map/MapType';
import { getPhotoData } from '../../common/api/record';

function Photo() {
  const [photos, setPhotos] = useState<Cert[]>([]);
  const [page, setPage] = useState<number>(0);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [cateogory, setCategory] = useState('CA0000');
  const [sortOption, setSortOption] = useState('최신순');
  const [isLast, setLast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getPhotoDataList();
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && !isLast) getPhotoDataList();
    else if (isLast) setFetching(true);
  }, [isFetching]);

  useEffect(()=>{
    getPhotoData(
      1,
      cateogory,
      0,
      6,
      (response: AxiosResponse) => {
        const { data } = response;
        console.log(response);
        setPage(1);
        setPhotos(data.data.content);
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
  },[cateogory])

  const getPhotoDataList = async () => {
    getPhotoData(
      1,
      cateogory,
      page,
      6,
      (response: AxiosResponse) => {
        const { data } = response;
        console.log(response);
        setPage(page + 1);
        setPhotos(photos.concat(data.data.content));
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
  };

  const photoContext = photos.map((photo) => {
    return <img src={photo.photoUrl} alt="cert" />;
  });
  if(photoContext.length % 2 === 0){
    photoContext.concat(<div className='photo-fake'/>)
  }

  console.log(photos);

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
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0001')}}>
          <img className={classNames({selected:cateogory==='CA0001'})} src={Walk} alt="walk" />
          <span>산책 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0002')}}>
          <img className={classNames({selected:cateogory==='CA0002'})} src={Cafe} alt="cafe" />
          <span>카페 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0003')}}>
          <img className={classNames({selected:cateogory==='CA0003'})} src={Hair} alt="hair" />
          <span>미용 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0004')}}>
          <img className={classNames({selected:cateogory==='CA0004'})} src={Bath} alt="bath" />
          <span>목욕 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0005')}}>
          <img className={classNames({selected:cateogory==='CA0005'})} src={Hospital} alt="hospital" />
          <span>병원 {10}회</span>
        </div>
        <div aria-hidden="true" className="photo-category-button item" onClick={()=>{setCategory('CA0006')}}>
          <img className={classNames({selected:cateogory==='CA0006'})} src={Eat} alt="eat" />
          <span>식당 {10}회</span>
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
      <div className="photo-wrapper">{photoContext}</div>
    </div>
  );
}

export default Photo;
