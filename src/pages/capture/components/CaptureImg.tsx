import React from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PrevArrowWhite from '../../../common/icons/prev-arrow-white.svg';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import PrevArrowBlack from '../../../common/icons/prev-arrow-black.svg';

function CaptureImg() {
  const { img } = useSelector((state: RootState) => state.persist.upload);
  const navigate = useNavigate();
  const location = useLocation();

  const moveToPreviousPage = () => {
    if (location.pathname === CAMERA_PATH.CAPTURE) navigate(CAMERA_PATH.FRONT);
    else navigate(CAMERA_PATH.CAPTURE);
  };
  return (
    <>
      <img
        src={PrevArrowBlack}
        className="camera-page-prev-arrow"
        alt="camera-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
      <img className="captured-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
    </>
  );
}

export default CaptureImg;
