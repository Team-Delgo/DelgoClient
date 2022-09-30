import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import BottomButton from '../../../common/components/BottomButton';

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

const categoryCode: categoryType = {
  산책: 'CA0001',
  카페: 'CA0002',
  식당: 'CA0003',
  목욕: 'CA0004',
  미용: 'CA0005',
  병원: 'CA0006',
  기타: 'CA9999'
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


  const submitReview = () => {
    console.log(1);
  };

  return (
    <main className="capture-img-result-main">
      <img className="captured-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <header className="capture-img-result-main-header">
        <div className="capture-img-result-main-header-title">{title}</div>
        <div className={`capture-img-result-main-header-${categoryEnglish[categoryKo]}`}>{categoryKo}</div>
      </header>
      <body className="capture-img-result-main-content">{content}</body>
      <footer aria-hidden="true" onClick={submitReview}>
        <BottomButton text="작성 완료" />
      </footer>
    </main>
  );
}

export default CaptureResultMain;
