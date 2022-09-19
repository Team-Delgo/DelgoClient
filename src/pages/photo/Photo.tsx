import React, {ChangeEvent, useEffect, useState} from "react";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import "./Photo.scss";

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
    <div className="photo-duration">2022.08.22 - 2022.08.30</div>
    <div className="photo-category">
      <div aria-hidden="true" className="photo-category-button walk">산책</div>
      <div aria-hidden="true" className="photo-category-button walk">카페</div>
      <div aria-hidden="true" className="photo-category-button walk">미용</div>
      <div aria-hidden="true" className="photo-category-button walk">목욕</div>
      <div aria-hidden="true" className="photo-category-button walk">식당</div>
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