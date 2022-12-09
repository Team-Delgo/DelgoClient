import React, { useState } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PrevArrowWhite from '../../../common/icons/prev-arrow-white.svg';
import { CAMERA_PATH, ROOT_PATH } from '../../../common/constants/path.const';
import PrevArrowBlack from '../../../common/icons/prev-arrow-black.svg';
import X from '../../../common/icons/xx.svg';
import DeleteBottomSheet from '../../../common/utils/ConfirmBottomSheet';

function CaptureImg() {
  const { img } = useSelector((state: RootState) => state.persist.upload);
  const navigate = useNavigate();
  const location = useLocation();
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);

  const moveToPreviousPage = () => {
    if (location.pathname === CAMERA_PATH.CAPTURE) navigate(CAMERA_PATH.FRONT);
    else navigate(CAMERA_PATH.CAPTURE);
  };

  const moveToHomePage = () => {
    navigate(ROOT_PATH);
  };

  const openBottomSheet = () => {
    setBottomSheetIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  return (
    <>
      <img
        src={PrevArrowBlack}
        className="capture-page-prev-arrow"
        alt="capture-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
      <img
        src={X}
        className="capture-page-x"
        alt="capture-page-x"
        aria-hidden="true"
        onClick={openBottomSheet}
      />
      <img className="captured-img" src={img} width={window.innerWidth} height={window.innerWidth} alt="caputeImg" />
      <DeleteBottomSheet
        text="작성중이던 기록이 삭제됩니다"
        description="지우면 다시 볼 수 없어요"
        cancelText="이어서 기록"
        acceptText="삭제 후 홈으로"
        acceptButtonHandler={moveToHomePage}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />
    </>
  );
}

export default CaptureImg;
