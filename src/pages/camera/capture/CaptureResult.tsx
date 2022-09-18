import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import BottomButton from '../../../common/components/BottomButton';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import CaptureResultHeader from '../components/CaptureResultHeader';
import CaptureResultMain from '../components/CaptureResultMain';
import './CaptureResult.scss';

function CaptureResult() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { img, title, content, categoryKo } = useSelector((state: RootState) => state.persist.upload);
  const { date, time, weekDay } = useSelector((state: RootState) => state.persist.date);

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

  const moveToCategoryPage = () => {
    navigate(CAMERA_PATH.CATEGORY);
  };

  const submitReview = () => {
    console.log(1);
  };
  return (
    <>
    <CaptureResultHeader/>
    <CaptureResultMain/>
    </>
  );
}

export default CaptureResult;
