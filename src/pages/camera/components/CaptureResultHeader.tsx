import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { CAMERA_PATH } from '../../../common/constants/path.const';

function CaptureResultHeader() {
  const navigate = useNavigate();
  const { date, time, weekDay } = useSelector((state: RootState) => state.persist.date);

  const moveToCategoryPage = () => {
    navigate(CAMERA_PATH.CATEGORY);
  };
  return (
    <header className="capture-img-result-header">
      <div className="capture-img-result-header-date">
        {date} {weekDay} {time}
      </div>
      <div className="capture-img-result-header-correction" aria-hidden="true" onClick={moveToCategoryPage}>
        수정
      </div>
    </header>
  );
}

export default CaptureResultHeader;
