import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import WhiteX from '../../../common/icons/white-x.svg';
import { CAMERA_PATH } from '../../../common/constants/path.const';

function CaptureCertificationUpdateImg() {
  const img = useSelector((state: RootState) => state.persist.upload.img);
  const navigate = useNavigate();
  const location = useLocation();

  const moveToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <>
      <img className="capture-update-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <img
        src={WhiteX}
        className="capture-category-update-page-prev-arrow"
        alt="capture-category-update-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
    </>
  );
}

export default CaptureCertificationUpdateImg;
