import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomButton from '../../../common/components/BottomButton';

interface captureCategoryType {
  img: string;
  category: string;
}

function CaptureCategoryRecord() {
  const [category, setCategory] = useState('');
  const [rivewText, setReviewText] = useState('');
  const [reviewCompleteAlert, setReviewCompleteAlert] = useState(false);
  const [reviewTextLengthLimitAlert, setReviewTextLengthLimitAlert] = useState(false);
  const [reviewImgExtensionAlert, setReviewImgExtensionAlert] = useState(false);
  const state = useLocation().state as captureCategoryType;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state.img);
    if (state.category === '산책') {
      setCategory('walk');
    } else if (state.category === '카페') {
      setCategory('cafe');
    } else if (state.category === '식당') {
      setCategory('restaurant');
    } else if (state.category === '병원') {
      setCategory('hospital');
    } else if (state.category === '미용') {
      setCategory('beauty');
    } else if (state.category === '목욕') {
      setCategory('bath');
    } else {
      setCategory('etc');
    }
  }, []);

  const moveToPreviousPage = () => {
    navigate(-1);
  };

  const handleReviewWrite = useCallback((e) => {
    setReviewText(e.target.value);
  }, []);

  const submitReview = () => {
    console.log(1);
  };

  return (
    <>
      <main className="capture-img-record">
        <header className="capture-img-record-container">
          <div className={`capture-img-record-body-${category}`} aria-hidden="true" onClick={moveToPreviousPage}>
            <div className={`capture-img-record-body-${category}-label`}>{state.category}</div>
            <div className={`capture-img-record-body-${category}-count`}>다시선택</div>
          </div>
        </header>
        <body className="review-container">
          <input type="text" className="review-place-name" placeholder="여기는 어디인가요? (ex: 델고커피)" />
          <textarea
            className="review-content"
            placeholder="남기고 싶은 기록을 작성해주세요"
            onChange={handleReviewWrite}
            maxLength={200}
          />
          <div className="review-content-length">{rivewText.length}/200</div>
        </body>
      </main>
      <div aria-hidden="true" onClick={submitReview}>
        <BottomButton text="작성 완료" />
      </div>
    </>
  );
}

export default CaptureCategoryRecord;
