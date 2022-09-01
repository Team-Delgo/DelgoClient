import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as PrevArrowWhite } from '../../../common/icons/prev-arrow-white.svg';
import './CapturePage.scss';

interface capturedImgType {
  img: string
}

function CapturePage() {
  const state = useLocation().state as capturedImgType;
  const navigate = useNavigate();

  console.log(state);

  const moveToPreviousPage = () => {
    navigate(-1);
  }

  return (
    <>
      <img className="captured-img" src={state.img} height={220} width={280} alt="caputeImg" />
      <PrevArrowWhite className="capture-page-prev-arrow" onClick={moveToPreviousPage} />
    </>
  )
}

export default CapturePage;