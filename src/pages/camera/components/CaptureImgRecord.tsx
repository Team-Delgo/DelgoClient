import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useDispatch } from 'react-redux';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { uploadAction } from '../../../redux/slice/uploadSlice';

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [window.innerHeight - window.innerWidth + 5, 0, 0, 0];

function CaptureImgRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBottomSheetIsOpen(true);
    }, 1000);
  }, [bottomSheetIsOpen]);

  const moveToCategoryPage = (category: string) => (e: React.MouseEvent) => {
    dispatch(uploadAction.setCategory({ category }));
    navigate(CAMERA_PATH.LOCATION);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  return (
    <Sheet isOpen={bottomSheetIsOpen} onClose={closeBottomSheet} snapPoints={sheetSnapPoints}>
      <Sheet.Container style={sheetStyle}>
        <Sheet.Content>
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
              <div
                className="capture-img-record-body-restaurant"
                aria-hidden="true"
                onClick={moveToCategoryPage('식당')}
              >
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
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default CaptureImgRecord;
