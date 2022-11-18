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
  const { img, title, content, categoryKo, address } = useSelector((state: RootState) => state.persist.upload);
  const { user, pet } = useSelector((state: RootState) => state.persist.user);

  return (
    <main className="capture-img-result-main">
      <img className="capture-img" src={img} alt="caputeImg" />
      <header className="capture-img-result-main-header">
        <div className="capture-img-result-main-header-place">
          <div className="capture-img-result-main-header-place-name">{title}</div>
          <div className="capture-img-result-main-header-place-address">{address}</div>
        </div>
        <img src={categoryIcon[categoryKo]} alt="category-img" />
      </header>
      <body className="capture-img-result-main-body">{content}</body>
    </main>
  );
}

export default CaptureResultMain;
