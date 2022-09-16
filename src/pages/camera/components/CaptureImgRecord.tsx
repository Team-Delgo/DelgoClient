import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CAMERA_PATH } from '../../../common/constants/path.const';

interface capturedImgType {
  img: string;
}

function CaptureImgRecord() {
  const navigate = useNavigate();
  const state = useLocation().state as capturedImgType;

  const moveToCategoryPage = (category: string) => (e: React.MouseEvent) => {
    navigate(CAMERA_PATH.CATEGORY, { state: { img: state.img, category } });
  };
  return (
    <div className="capture-img-record">
      <header className="capture-img-record-header">어떤 기록을 남기시겠어요?</header>
      <body className="capture-img-record-body">
        <div className="capture-img-record-body-walk" aria-hidden="true" onClick={moveToCategoryPage('산책')}>
          <div className="capture-img-record-body-walk-label">산책</div>
          <div className="capture-img-record-body-walk-count">0</div>
        </div>
        <div className="capture-img-record-body-cafe" aria-hidden="true" onClick={moveToCategoryPage('카페')}>
          <div className="capture-img-record-body-cafe-label">카페</div>
          <div className="capture-img-record-body-cafe-count">0</div>
        </div>
        <div className="capture-img-record-body-restaurant" aria-hidden="true" onClick={moveToCategoryPage('식당')}>
          <div className="capture-img-record-body-restaurant-label">식당</div>
          <div className="capture-img-record-body-restaurant-count">0</div>
        </div>
        <div className="capture-img-record-body-hospital" aria-hidden="true" onClick={moveToCategoryPage('병원')}>
          <div className="capture-img-record-body-hospital-label">병원</div>
          <div className="capture-img-record-body-hospital-count">0</div>
        </div>
        <div className="capture-img-record-body-beauty" aria-hidden="true" onClick={moveToCategoryPage('미용')}>
          <div className="capture-img-record-body-beauty-label">미용</div>
          <div className="capture-img-record-body-beauty-count">0</div>
        </div>
        <div className="capture-img-record-body-bath" aria-hidden="true" onClick={moveToCategoryPage('목욕')}>
          <div className="capture-img-record-body-bath-label">목욕</div>
          <div className="capture-img-record-body-bath-count">0</div>
        </div>
        <div className="capture-img-record-body-etc" aria-hidden="true" onClick={moveToCategoryPage('기타')}>
          <div className="capture-img-record-body-etc-label">기타</div>
          <div className="capture-img-record-body-etc-count">0</div>
        </div>
      </body>
    </div>
  );
}

export default CaptureImgRecord;
