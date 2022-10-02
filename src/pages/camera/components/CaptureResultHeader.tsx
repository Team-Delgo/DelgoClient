import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { CAMERA_PATH } from '../../../common/constants/path.const';

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
  const navigate = useNavigate();
  const registDt = useSelector((state: RootState) => state.persist.upload.registDt);

  const moveToCategoryPage = () => {
    navigate(CAMERA_PATH.CATEGORY);
  };
  return (
    <header className="capture-img-result-header">
      <div className="capture-img-result-header-date">
        {registDt.substring(0, 10)}&nbsp;{weekDay[registDt.substring(17, registDt.length)]}&nbsp;&nbsp;&nbsp;{registDt.substring(11, 16)}
      </div>
      <div className="capture-img-result-header-correction" aria-hidden="true" onClick={moveToCategoryPage}>
        수정
      </div>
    </header>
  );
}

export default CaptureResultHeader;
