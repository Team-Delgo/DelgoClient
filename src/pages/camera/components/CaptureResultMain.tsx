import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import BottomButton from '../../../common/components/BottomButton';

function CaptureResultMain() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { img, title, content, categoryKo } = useSelector((state: RootState) => state.persist.upload);

  useEffect(() => {
    if (categoryKo === '산책') {
      setCategory('walk');
    } else if (categoryKo === '카페') {
      setCategory('cafe');
    } else if (categoryKo === '식당') {
      setCategory('restaurant');
    } else if (categoryKo === '병원') {
      setCategory('hospital');
    } else if (categoryKo === '미용') {
      setCategory('beauty');
    } else if (categoryKo === '목욕') {
      setCategory('bath');
    } else {
      setCategory('etc');
    }
  }, []);

  const submitReview = () => {
    console.log(1);
  };

  return (
    <main className="capture-img-result-main">
      <img className="captured-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <header className="capture-img-result-main-header">
        <div className="capture-img-result-main-header-title">{title}</div>
        <div className={`capture-img-result-main-header-${category}`}>{categoryKo}</div>
      </header>
      <body className="capture-img-result-main-content">{content}</body>
      <footer aria-hidden="true" onClick={submitReview}>
        <BottomButton text="작성 완료" />
      </footer>
    </main>
  );
}

export default CaptureResultMain;
