import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrevArrowWhite from '../../../common/icons/prev-arrow-white.svg';

interface capturedImgType {
  img: string;
}

function CaptureImg() {
  const state = useLocation().state as capturedImgType;
  const navigate = useNavigate();

  const moveToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <>
      <img
        className="captured-img"
        src={state.img}
        width={window.innerWidth}
        height={window.innerWidth}
        alt="caputeImg"
      />
      <img
        src={PrevArrowWhite}
        className="capture-page-prev-arrow"
        alt="capture-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
    </>
  );
}

export default CaptureImg;
