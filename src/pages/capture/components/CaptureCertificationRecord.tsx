import React, { useState, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { useSelector, useDispatch } from 'react-redux';
import Sheet from 'react-modal-sheet';
import imageCompression from 'browser-image-compression';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import {
  registerCameraCertificationPost,
  registerGalleryCertificationPost,
  registerGalleryCertificationImg,
} from '../../../common/api/certification';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';
import WrittingButton from '../../../common/icons/writting-button.svg';
import WrittingButtonActive from '../../../common/icons/writting-button-active.svg';
import ToastPurpleMessage from '../../../common/dialog/ToastPurpleMessage';
import { analytics } from '../../../index';
import { categoryCode, categoryIcon } from '../../../common/types/category';

interface CaptureCertificationRecordPropsType {
  postCertificationIsLoading: boolean;
  setPostCertificationIsLoading: (params: boolean) => void;
}

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };

function CaptureCertificationRecord({ postCertificationIsLoading, setPostCertificationIsLoading }: CaptureCertificationRecordPropsType) {
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificateErrorToastMessage, setCertificateErrorToastMessage] = useState('');
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
  const [showCertificateErrorToast, setShowCertificateErrorToast] = useState(false);
  const { categoryKo, img, latitude, longitude, mongPlaceId, title, tool, file } = useSelector((state: RootState) => state.persist.upload);
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = new FormData();
  const location = useLocation();
  const certCompleteEvent = useAnalyticsCustomLogEvent(analytics, 'cert_end');

  useEffect(() => {
    if (showCertificateErrorToast) {
      setTimeout(() => {
        closeCertificateErrorToast();
      }, 2000);
    }
  }, [showCertificateErrorToast]);

  const uploadCameraImgCertification = () => {
    if (postCertificationIsLoading) {
      return;
    }
    setPostCertificationIsLoading(true);
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
          certCompleteEvent.mutate();
          dispatch(
            uploadAction.setContentRegistDtCertificationIdAddress({
              content: certificationPostContent,
              registDt: data.registDt,
              certificationId: data.certificationId,
              address: data.address,
              achievements: [],
            }),
          );
          if (data.isAchievements) {
            dispatch(
              uploadAction.setAchievements({
                achievements: data.achievements,
              }),
            );
          }
          setPostCertificationIsLoading(false);
          moveToCaptureResultPage();
        } else if (code === 314) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('??????????????? ?????? 5????????? ?????? ???????????????');
          openCertificateErrorToast();
        } else if (code === 313) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('6?????? ?????? ?????? ???????????? ?????? ??????????????????');
          openCertificateErrorToast();
        } else if (code === 312) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('?????? ????????? ????????? ?????? ????????????');
          openCertificateErrorToast();
        } else if (code === 316) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('GPS??? ?????? ?????? ????????? ?????? ????????? ???????????? ????????????');
          openCertificateErrorToast();
        }
      },
      dispatch,
    );
  };

  const uploadGalleryImgCertification = () => {
    if (postCertificationIsLoading) {
      return;
    }
    setPostCertificationIsLoading(true);
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
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        console.log('response', response);
        if (code === 200) {
          const options = {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };

          formData.append('photo', file);
          console.log('formData', formData);
          registerGalleryCertificationImg(
            formData,
            data.certificationId,
            (response: AxiosResponse) => {
              console.log('2??????', response);
              const { code, codeMsg } = response.data;
              if (code === 200) {
                dispatch(
                  uploadAction.setContentRegistDtCertificationIdAddress({
                    content: certificationPostContent,
                    registDt: data.registDt,
                    certificationId: data.certificationId,
                    address: data.address,
                    achievements: [],
                  }),
                );
                if (data.isAchievements) {
                  dispatch(
                    uploadAction.setAchievements({
                      achievements: data.achievements,
                    }),
                  );
                }
                setPostCertificationIsLoading(false);
                moveToCaptureResultPage();
              }
            },
            dispatch,
          );
        } else if (code === 314) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('??????????????? ?????? 5????????? ?????? ???????????????');
          openCertificateErrorToast();
        } else if (code === 313) {
          setPostCertificationIsLoading(false);
          setCertificateErrorToastMessage('6?????? ?????? ?????? ???????????? ?????? ??????????????????');
          openCertificateErrorToast();
        }
      },
      dispatch,
    );
  };

  const handlingDataForm = (dataURI: any) => {
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

    console.log(formData, formData);

    return formData;
  };

  const writeContent = useCallback((e) => {
    setCertificationPostContent(e.target.value.trim());
  }, []);

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  const openCertificateErrorToast = () => {
    setShowCertificateErrorToast(true);
  };

  const closeCertificateErrorToast = () => {
    setShowCertificateErrorToast(false);
  };

  const moveToCapturePage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  const moveToCaptureResultPage = () => {
    navigate(CAMERA_PATH.RESULT, {
      state: {
        prevPath: location?.pathname,
      },
    });
  };

  return (
    <>
      <Sheet
        isOpen={bottomSheetIsOpen}
        onClose={closeBottomSheet}
        snapPoints={[
          window.screen.height - window.screen.width + 10,
          window.screen.height - window.screen.width + 10,
          window.screen.height - window.screen.width + 10,
          window.screen.height - window.screen.width + 10,
        ]}
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
                    ????????????
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
                  placeholder="????????? ?????? ????????? ??????????????????"
                  onChange={writeContent}
                  maxLength={1000}
                />
                <div className="review-content-length">{certificationPostContent.length}/1000</div>
              </body>
            </main>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
      {showCertificateErrorToast && <ToastPurpleMessage message={certificateErrorToastMessage} />}
    </>
  );
}

export default CaptureCertificationRecord;
