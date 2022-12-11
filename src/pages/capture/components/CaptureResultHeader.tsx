import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { RootState } from '../../../redux/store';
import { CAMERA_PATH, POSTS_PATH, ROOT_PATH } from '../../../common/constants/path.const';
import { deleteCertificationPost } from '../../../common/api/certification';
import X from '../../../common/icons/xx.svg';
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne';
import DeleteBottomSheet from '../../../common/utils/ConfirmBottomSheet';

interface weekDayType {
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
  Sun: string;
  [prop: string]: any;
}

const weekDay: weekDayType = {
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
  Sun: '일',
};

function CaptureResultHeader() {
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registDt, certificationId } = useSelector((state: RootState) => state.persist.upload);
  const { user } = useSelector((state: RootState) => state.persist.user);
  const location: any = useLocation();

  console.log('location', location?.state?.prevPrevPath === '/posts');

  const deleteCertification = () => {
    closeBottomSheet();
    deleteCertificationPost(
      user.id,
      certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        console.log(response);
        if (code === 200) {
          moveToHomePage();
        }
      },
      dispatch,
    );
  };

  const moveToUpdatePage = () => {
    navigate(CAMERA_PATH.UPDATE);
  };

  const moveToHomePage = () => {
    navigate(ROOT_PATH);
  };

  const moveToPostsPage = () => {
    navigate(POSTS_PATH);
  };

  const openBottomSheet = () => {
    setBottomSheetIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  return (
    <>
      <header className="capture-img-result-header">
        <div className="capture-img-result-header-record-complete">기록완료</div>
        <div className="capture-img-result-header-record">
          <div className="capture-img-result-header-record-date">
            {registDt.substring(0, 10)}&nbsp;{weekDay[registDt.substring(17, registDt.length)]}&nbsp;&nbsp;&nbsp;
            {registDt.substring(11, 16)}
          </div>
          <div className="capture-img-result-header-record-work">
            <div className="capture-img-result-header-record-work-modify" aria-hidden="true" onClick={moveToUpdatePage}>
              수정&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            </div>
            <div className="capture-img-result-header-record-work-delete" aria-hidden="true" onClick={openBottomSheet}>
              삭제
            </div>
          </div>
          <img
            src={X}
            className="capture-page-x"
            alt="capture-page-x"
            aria-hidden="true"
            onClick={location?.state?.prevPrevPath === POSTS_PATH ? moveToPostsPage : moveToHomePage}
          />
        </div>
      </header>
      <DeleteBottomSheet
        text="기록을 삭제하실건가요?"
        description="지우면 다시 볼 수 없어요"
        cancelText="취소"
        acceptText="삭제"
        acceptButtonHandler={deleteCertification}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />
    </>
  );
}

export default CaptureResultHeader;
