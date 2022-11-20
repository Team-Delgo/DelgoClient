import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sheet, { SheetRef } from 'react-modal-sheet';
import imageCompression from 'browser-image-compression';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import {
  registerCameraCertificationPost,
  registerGalleryCertificationPost,
  registerGalleryCertificationImg,
} from '../../../common/api/certification';
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
import getCroppedImg from '../../../common/utils/CropImg';

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
const sheetSnapPoints = [470, 470, 470, 470];

function CaptureCategoryRecord() {
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificateErrorAlertMessage, setCertificateErrorAlertMessage] = useState('');
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
  const [showCertificateErrorAlert, setShowCertificateErrorAlert] = useState(false);
  const [showCertificateCompletionAlert, setShowCertificateCompletionAlert] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { categoryKo, img, latitude, longitude, mongPlaceId, title, tool, file } = useSelector(
    (state: RootState) => state.persist.upload,
  );
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef<SheetRef>();
  const formData = new FormData();
  
  const uploadCameraImgCertification = () => {
    if (buttonDisabled) {
      return;
    }
    setButtonDisabled(true);
    registerCameraCertificationPost(
      {
        userId: user.id,
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
            uploadAction.setContentRegistDtCertificationIdAddress({
              content: certificationPostContent,
              registDt: data.registDt,
              certificationId: data.certificationId,
              address:data.address
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
      dispatch,
    );
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
  };

  const uploadGalleryImgCertification = () => {
    if (buttonDisabled) {
      return;
    }
    registerGalleryCertificationPost(
      {
        userId: user.id,
        categoryCode: categoryCode[categoryKo],
        mungpleId: mongPlaceId,
        placeName: title,
        description: certificationPostContent,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
       async (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        console.log('response', response);
        if (code === 200) {
          try {
            const options = {
              maxSizeMB: 0.2,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };

            formData.append('photo',file)
            console.log('formData',formData)
            registerGalleryCertificationImg(
              formData,
              data.certificationId,
              (response: AxiosResponse) => {
                console.log('2번째',response);
                const { code, codeMsg } = response.data;
                if (code === 200) {
                  dispatch(
                    uploadAction.setContentRegistDtCertificationIdAddress({
                      content: certificationPostContent,
                      registDt: data.registDt,
                      certificationId: data.certificationId,
                      address:data.address
                    }),
                  );
                  openCertificateCompletionAlert();
                } else {
                  setCertificateErrorAlertMessage('서버 장애가 발생했습니다');
                  openCertificateErrorAlert();
                }
              },
              dispatch,
            );
            // console.log('이미지압축전');
            // const compressedFile = await imageCompression(file as unknown as File, options);
            // console.log('이미지압축후');
            // const reader = new FileReader();
            // reader.readAsDataURL(compressedFile);
            // reader.onloadend = async () => {
            //   const base64data = reader.result;
            //   console.log('base64data',base64data)
            //   const formData = await handlingDataForm(base64data);
  
            //   console.log(formData)
  
            //   registerGalleryCertificationImg(
            //     formData,
            //     data.certificationId,
            //     (response: AxiosResponse) => {
            //       console.log('2번째',response);
            //       const { code, codeMsg } = response.data;
            //       if (code === 200) {
            //         openCertificateCompletionAlert();
            //       } else {
            //         setCertificateErrorAlertMessage('서버 장애가 발생했습니다');
            //         openCertificateErrorAlert();
            //       }
            //     },
            //     dispatch,
            //   );
  
            //   dispatch(
            //     uploadAction.setContentRegistDtCertificationId({
            //       content: certificationPostContent,
            //       registDt: data.registDt,
            //       certificationId: data.certificationId,
            //     }),
            //   );
            //   openCertificateCompletionAlert();
            // };
          } catch (err: any) {
            console.log('err',err);
          }
        } else if (code === 314) {
          setCertificateErrorAlertMessage('카테고리당 하루 5번까지 인증 가능합니다');
          openCertificateErrorAlert();
        } else if (code === 313) {
          setCertificateErrorAlertMessage('6시간 이내 같은 장소에서 인증 불가능합니다');
          openCertificateErrorAlert();
        } else {
          setCertificateErrorAlertMessage('서버 장애가 발생했습니다');
          openCertificateErrorAlert();
        }
      },
      dispatch,
    );
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);
  };

  const handlingDataForm = async (dataURI: any) => {
    const byteString = atob(dataURI.split(',')[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');

    const formData = new FormData();
    formData.append('photo', file);

    console.log(formData,formData)

    return formData;
  };

  const writeContent = useCallback((e) => {
    setCertificationPostContent(e.target.value.trim());
  }, []);

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
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

  const moveToCapturePage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  return (
    <>
      <Sheet
        isOpen
        onClose={closeBottomSheet}
        snapPoints={sheetSnapPoints}
        // ref={ref}
        disableDrag
        className="modal-bottom-sheet"
      >
        <Sheet.Container style={sheetStyle}>
          <Sheet.Content>
            <main className="capture-img-record">
              <header className="capture-img-record-container">
                <img src={categoryIcon[categoryKo]} alt="category-img" />
                <div className="capture-img-record-category">
                  <div className="capture-img-record-category-label">{categoryKo}</div>
                  <div className="capture-img-record-category-rechoice" aria-hidden="true" onClick={moveToCapturePage}>
                    다시선택
                  </div>
                </div>
                {certificationPostContent.length > 0 ? (
                  <img
                    className="writting-button"
                    src={WrittingButtonActive}
                    alt="category-img"
                    aria-hidden="true"
                    onClick={tool === 'camera' ? uploadCameraImgCertification : uploadGalleryImgCertification}
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
                  maxLength={1000}
                />
                <div className="review-content-length">{certificationPostContent.length}/1000</div>
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

export default CaptureCategoryRecord;
