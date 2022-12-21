import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PrevArrowWhite from '../../../common/icons/prev-arrow-white.svg';
import X from '../../../common/icons/white-x.svg';

interface CaptureCertificationImgPropsType {
  openBottomSheet: () => void;
}

function CaptureCertificationImg({ openBottomSheet }: CaptureCertificationImgPropsType) {
  const img = useSelector((state: RootState) => state.persist.upload.img);
  const navigate = useNavigate();

  const moveToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <img className="capture-certification-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <img
        src={PrevArrowWhite}
        className="capture-page-prev-arrow"
        alt="capture-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
      <img src={X} className="capture-page-x" alt="capture-page-x" aria-hidden="true" onClick={openBottomSheet} />
    </>
  );
}

export default CaptureCertificationImg;
