import React, {ChangeEvent, useEffect, useState} from "react";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import "./Photo.scss";
import Cafe from "../../common/icons/cafe.svg";
import Walk from "../../common/icons/walk.svg";
import Hair from "../../common/icons/beauty.svg";
import Hospital from "../../common/icons/hospital.svg";
import Bath from "../../common/icons/bath.svg";

function Photo(){
  const [photos, setPhotos] = useState([]);
  const [sortOption, setSortOption] = useState('recent');


  // useEffect(()=>{
  // },[]);

  const changeSelectBoxHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return <div className="photo">
    <RecordHeader/>
    <FooterNavigation/>
    <div className="photo-category">
      <div aria-hidden="true" className="photo-category-button walk">
        <img src={Walk} alt="walk"/>
        <span>산책</span>  
      </div>
      <div aria-hidden="true" className="photo-category-button cafe">
        <img src={Cafe} alt="walk"/>
        <span>카페</span>  
      </div>
      <div aria-hidden="true" className="photo-category-button hair">
        <img src={Hair} alt="walk"/>
        <span>미용</span>  
      </div>
      <div aria-hidden="true" className="photo-category-button bath">
        <img src={Bath} alt="walk"/>
        <span>목욕</span>  
      </div>
      <div aria-hidden="true" className="photo-category-button hosp">
        <img src={Hospital} alt="walk"/>
        <span>병원</span>  
      </div>
    </div>
    <select name="sort" onChange={changeSelectBoxHandler}>
      <option value="recent">최신순</option>
    </select>
    <div className="photo-registed">
      1
    </div>
  </div>
}

export default Photo;