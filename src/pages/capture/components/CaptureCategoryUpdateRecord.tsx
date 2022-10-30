import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sheet, { SheetRef } from 'react-modal-sheet';
import BottomButton from '../../../common/components/BottomButton';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { registerCertificationPost } from '../../../common/api/certification';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';
import Bath from '../../../common/icons/bath.svg';
import Beauty from '../../../common/icons/beauty.svg';
import Cafe from '../../../common/icons/cafe.svg';
import Hospital from '../../../common/icons/hospital.svg';
import Restorant from '../../../common/icons/restorant.svg';
import Walk from '../../../common/icons/walk.svg';
import Etc from '../../../common/icons/etc.svg';
import WrittingButton from '../../../common/icons/writting-button.svg';
import WrittingButtonActive from '../../../common/icons/writting-button-active.svg';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne';

interface categoryType {
  산책: string;
  카페: string;
  식당: string;
  목욕: string;
  미용: string;
  병원: string;
  기타: string;
  [prop: string]: any;
}

const categoryCode: categoryType = {
  산책: 'CA0001',
  카페: 'CA0002',
  식당: 'CA0003',
  목욕: 'CA0004',
  미용: 'CA0005',
  병원: 'CA0006',
  기타: 'CA9999',
};

const categoryIcon: categoryType = {
  산책: Walk,
  카페: Cafe,
  식당: Restorant,
  목욕: Bath,
  미용: Beauty,
  병원: Hospital,
  기타: Etc,
};

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [-window.innerWidth + 20, 0.5, 100, 0];

function CaptureCategoryUpdateRecord() {
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificateErrorAlertMessage, setCertificateErrorAlertMessage] = useState('');
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
  const [showCertificateErrorAlert, setShowCertificateErrorAlert] = useState(false);
  const [showCertificateCompletionAlert, setShowCertificateCompletionAlert] = useState(false);
  const { categoryKo, img, latitude, longitude, mongPlaceId, title } = useSelector(
    (state: RootState) => state.persist.upload,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef<SheetRef>();

  const writeContent = useCallback((e) => {
    setCertificationPostContent(e.target.value.trim());
  }, []);

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  const uploadCertificationPost = () => {
    console.log(categoryCode[categoryKo]);
    console.log(mongPlaceId);
    console.log(title);
    console.log(certificationPostContent);
    console.log(latitude.toString());
    console.log(longitude.toString());
    console.log(img);
    registerCertificationPost(
      {
        userId: 1,
        categoryCode: categoryCode[categoryKo],
        mungpleId: mongPlaceId,
        placeName: title,
        description: certificationPostContent,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        photo: img,
      },
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        console.log('response', response);
        if (code === 200) {
          dispatch(
            uploadAction.setContentRegistDt({
              content: certificationPostContent,
              registDt: data.registDt,
            }),
          );
          openCertificateCompletionAlert();
        } else if (code === 314) {
          setCertificateErrorAlertMessage('카테고리당 하루 5번까지 인증 가능합니다');
          openCertificateErrorAlert();
        } else if (code === 313) {
          setCertificateErrorAlertMessage('6시간 이내 같은 장소에서 인증 불가능합니다');
          openCertificateErrorAlert();
        } else if (code === 312) {
          setCertificateErrorAlertMessage('인증 가능한 장소에 있지 않습니다');
          openCertificateErrorAlert();
        } else {
          setCertificateErrorAlertMessage('서버 장애가 발생했습니다');
          openCertificateErrorAlert();
        }
      },
    );
  };
  const openCertificateErrorAlert = () => {
    setShowCertificateErrorAlert(true);
  };

  const closeCertificateErrorAlert = () => {
    setShowCertificateErrorAlert(false);
  };

  const openCertificateCompletionAlert = () => {
    setShowCertificateCompletionAlert(true);
  };

  const closeCertificateCompletionAlert = () => {
    setShowCertificateCompletionAlert(false);
    setTimeout(() => {
      navigate(CAMERA_PATH.RESULT);
    }, 500);
  };

  return (
    <>
      <Sheet
        isOpen
        onClose={closeBottomSheet}
        // snapPoints={sheetSnapPoints}
        // ref={ref}
        // disableDrag
        className="modal-bottom-sheet"
      >
        <Sheet.Container style={sheetStyle}>
          <Sheet.Content>
            <main className="capture-img-record">
              <header className="capture-img-record-container">
                <img src={categoryIcon[categoryKo]} alt="category-img" />
                <div className="capture-img-record-category">
                  <div className="capture-img-record-category-label">{categoryKo}</div>
                </div>
                {certificationPostContent.length > 0 ? (
                  <img
                    className="writting-button"
                    src={WrittingButtonActive}
                    alt="category-img"
                    aria-hidden="true"
                    onClick={uploadCertificationPost}
                  />
                ) : (
                  <img className="writting-button" src={WrittingButton} alt="category-img" />
                )}
              </header>
              <body className="review-container">
                <input type="text" className="review-place-name" value={title} disabled />
                <textarea
                  className="review-content"
                  placeholder="남기고 싶은 기록을 작성해주세요"
                  onChange={writeContent}
                  maxLength={200}
                />
                <div className="review-content-length">{certificationPostContent.length}/200</div>
              </body>
            </main>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
      {showCertificateErrorAlert && (
        <AlertConfirmOne text={certificateErrorAlertMessage} buttonHandler={closeCertificateErrorAlert} />
      )}
      {showCertificateCompletionAlert && (
        <AlertConfirmOne text="인증이 성공하였습니다" buttonHandler={closeCertificateCompletionAlert} />
      )}
    </>
  );
}

export default CaptureCategoryUpdateRecord;
