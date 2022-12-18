import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureResultHeader from './components/CaptureCertificationResultHeader';
import CaptureResultMain from './components/CaptureCertificationResultMain';
import './CaptureCertificationResultPage.scss';
import { analytics } from '../../index';
import ToastPurpleMessage from '../../common/dialog/ToastPurpleMessage';
import { RootState } from '../../redux/store';
import AchievementBottomSheet from '../../common/utils/AchievementBottomSheet';

function CaptureResult() {
  const [showCertificateSuccessToast, setShowCertificateSuccessToast] = useState(false);
  const [showCertificateUpdateSuccessToast, setShowCertificateUpdateSuccessToast] = useState(false);
  const [achievementBottomSheetIsOpen1, setAchievementBottomSheetIsOpen1] = useState(false);
  const [achievementBottomSheetIsOpen2, setAchievementBottomSheetIsOpen2] = useState(false);
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');
  const location: any = useLocation();
  const { achievements } = useSelector((state: RootState) => state.persist.upload);

  useEffect(() => {
    console.log('achievements',achievements)
    if (achievements.length === 1) {
      setAchievementBottomSheetIsOpen1(true);
    } else if (achievements.length === 2) {
      setAchievementBottomSheetIsOpen1(true);
      setAchievementBottomSheetIsOpen2(true);
    }
  }, []);

  useEffect(() => {
    if (location?.state?.prevPath?.includes('update')) {
      setShowCertificateUpdateSuccessToast(true);
      setTimeout(() => {
        setShowCertificateUpdateSuccessToast(false);
      }, 2000);
    } else {
      setShowCertificateSuccessToast(true);
      setTimeout(() => {
        setShowCertificateSuccessToast(false);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: 'CaptureResult',
        firebase_screen_class: 'CaptureResultPage',
      },
    });
  }, []);

    // useEffect(() => {
  //   preventGoBack()
  // }, []);


  // const preventGoBack = () => {
  //   window.history.pushState(null, '', location.href);

  //   window.onpopstate = function (event) {
  //     window.history.go(1);
  //     console.log('prevent go back!');
  //   };
  // };

  return (
    <>
      <CaptureResultHeader />
      <CaptureResultMain />
      <AchievementBottomSheet
        text="업적 획득"
        achievement={achievements[0]}
        cancelButtonHandler={() => {
          setAchievementBottomSheetIsOpen1(false);
        }}
        bottomSheetIsOpen={achievementBottomSheetIsOpen1}
      />
      <AchievementBottomSheet
        text="업적 획득"
        achievement={achievements[1]}
        cancelButtonHandler={() => {
          setAchievementBottomSheetIsOpen2(false);
        }}
        bottomSheetIsOpen={achievementBottomSheetIsOpen2}
      />
      {showCertificateSuccessToast && <ToastPurpleMessage message="인증에 성공하였습니다" />}
      {showCertificateUpdateSuccessToast && <ToastPurpleMessage message="인증 수정에 성공하였습니다" />}
    </>
  );
}

export default CaptureResult;
