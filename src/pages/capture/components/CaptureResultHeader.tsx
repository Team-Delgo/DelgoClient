import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { RootState } from '../../../redux/store';
import { CAMERA_PATH, ROOT_PATH } from '../../../common/constants/path.const';
import { deleteCertificationPost } from '../../../common/api/certification';
import X from '../../../common/icons/xx.svg';
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne';

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
const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

function CaptureResultHeader() {
  const [showDeleteCompleteAlert, setShowDeleteCompleteAlert] = useState(false);
  const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registDt, certificationId } = useSelector((state: RootState) => state.persist.upload);
  const { user } = useSelector((state: RootState) => state.persist.user);

  const deleteCertification = () => {
    closeBottomSheet();
    deleteCertificationPost(
      user.id,
      certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        console.log(response);
        if (code === 200) {
          setShowDeleteCompleteAlert(true);
        } else {
          openDeleteErrorAlert();
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

  const openDeleteErrorAlert = () => {
    setShowDeleteErrorAlert(true);
  };

  const closeDelteErrorAlert = () => {
    setShowDeleteErrorAlert(false);
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
          <img src={X} className="capture-page-x" alt="capture-page-x" aria-hidden="true" onClick={moveToHomePage} />
        </div>
      </header>
      {showDeleteCompleteAlert && <AlertConfirmOne text="삭제를 성공하였습니다" buttonHandler={moveToHomePage} />}
      {showDeleteErrorAlert && <AlertConfirmOne text="서버 장애가 발생했습니다" buttonHandler={closeDelteErrorAlert} />}
      <Sheet
        style={{ borderRadius: '19px 19px 0 0' }}
        isOpen={bottomSheetIsOpen}
        onClose={closeBottomSheet}
        snapPoints={[300, 300, 100, 0]}
      >
        <Sheet.Container style={sheetStyle}>
          {/* <Sheet.Header /> */}
          <Sheet.Content>
            <div className="delete-bottom-sheet">
              <div className="delete-bottom-sheet-title">
                <div className="delete-bottom-sheet-title-text">기록을 삭제하실건가요?</div>
                <div className="delete-bottom-sheet-title-sub-text">지우면 다시 볼 수 없어요</div>
              </div>
              <div className="delete-bottom-sheet-button">
                <div className="delete-bottom-sheet-button-cancle" aria-hidden="true" onClick={closeBottomSheet}>취소</div>
                <div className="delete-bottom-sheet-button-delete" aria-hidden="true" onClick={deleteCertification}>삭제</div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}

export default CaptureResultHeader;
