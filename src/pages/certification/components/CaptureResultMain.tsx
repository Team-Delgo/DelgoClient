import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import BottomButton from '../../../common/components/BottomButton';
import Bath from '../../../common/icons/bath.svg';
import Beauty from '../../../common/icons/beauty.svg';
import Cafe from '../../../common/icons/cafe.svg';
import Hospital from '../../../common/icons/hospital.svg';
import Walk from '../../../common/icons/walk.svg';
import { ROOT_PATH } from '../../../common/constants/path.const';

interface categoryType {
  산책: string;
  카페: string;
  식당: string;
  목욕: string;
  미용: string;
  병원: string;
  기타: string;
  [prop: string]: any;
}

const categoryIcon: categoryType = {
  산책: Walk,
  카페: Cafe,
  식당: Bath,
  목욕: Bath,
  미용: Beauty,
  병원: Hospital,
  기타: Hospital,
};

const categoryEnglish: categoryType = {
  산책: 'walk',
  카페: 'cafe',
  식당: 'restaurant',
  목욕: 'hospital',
  미용: 'beauty',
  병원: 'bath',
  기타: 'etc',
};

function CaptureResultMain() {
  const navigate = useNavigate();
  const { img, title, content, categoryKo } = useSelector((state: RootState) => state.persist.upload);



  return (
    <main className="capture-img-result-main">
      <img src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <header className="capture-img-result-main-header">
        <img src={`${process.env.PUBLIC_URL}/assets/dog-img.png`} alt="copy url" />
        <div className="capture-img-result-main-header-profile">
          <div className="capture-img-result-main-header-profile-address">서울시 송파구</div>
          <div className="capture-img-result-main-header-profile-name">다크서은</div>
        </div>
      </header>
      <body className="capture-img-result-main-body">
        <div className="capture-img-result-main-body-title">{title}</div>
        <div className="capture-img-result-main-body-content">{content}</div>
      </body>
    </main>
  );
}

export default CaptureResultMain;
