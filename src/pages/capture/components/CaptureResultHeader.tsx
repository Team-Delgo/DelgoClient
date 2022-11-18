import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { CAMERA_PATH, ROOT_PATH } from '../../../common/constants/path.const';
import X from '../../../common/icons/xx.svg';
import AlertConfirm from '../../../common/dialog/AlertConfirm'

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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { registDt } = useSelector((state: RootState) => state.persist.upload);

  const moveToCategoryPage = () => {
    navigate(CAMERA_PATH.UPDATE);
  };

  const moveToHomePage = () => {
    navigate(ROOT_PATH);
  };

  const openDeleteAlert = () => {
    setShowDeleteAlert(true)
  }

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false)
  }

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
            <div
              className="capture-img-result-header-record-work-modify"
              aria-hidden="true"
              onClick={moveToCategoryPage}
            >
              수정&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            </div>
            <div
              className="capture-img-result-header-record-work-delete"
              aria-hidden="true"
              onClick={openDeleteAlert}
            >
              삭제
            </div>
          </div>
          <img src={X} className="capture-page-x" alt="capture-page-x" aria-hidden="true" onClick={moveToHomePage} />
        </div>
      </header>
      {showDeleteAlert && (
        <AlertConfirm
          text="인증 기록을 삭제 하시겠습니까?"
          buttonText="삭제"
          noButtonHandler={closeDeleteAlert}
          yesButtonHandler={() => {
            console.log(1)
          }}
        />
      )}
    </>
  );
}

export default CaptureResultHeader;
