import React from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PrevArrowWhite from '../../../common/icons/prev-arrow-white.svg';
import { CAMERA_PATH, ROOT_PATH } from '../../../common/constants/path.const';
import X from '../../../common/icons/white-x.svg';

function CaptureCertificationImg() {
  const img = useSelector((state: RootState) => state.persist.upload.img);
  const navigate = useNavigate();
  const location = useLocation();


  const moveToPreviousPage = () => {
    if(location.pathname===CAMERA_PATH.CAPTURE) navigate(CAMERA_PATH.FRONT);
    else navigate(CAMERA_PATH.CAPTURE);
  };

  const moveToHomePage = () => {
    navigate(ROOT_PATH);
  };
  return (
    <>
      <img src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <img
        src={PrevArrowWhite}
        className="capture-page-prev-arrow"
        alt="capture-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
      <img src={X} className="capture-page-x" alt="capture-page-x" aria-hidden="true" onClick={moveToHomePage} />
    </>
  );
}

export default CaptureCertificationImg;
