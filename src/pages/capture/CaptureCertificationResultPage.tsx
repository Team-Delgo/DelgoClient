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
import AchievementBottomSheet from '../../common/dialog/AchievementBottomSheet';

function CaptureResult() {
  const [showCertificateSuccessToast, setShowCertificateSuccessToast] = useState(false);
  const [showCertificateUpdateSuccessToast, setShowCertificateUpdateSuccessToast] = useState(false);
  const [achievementBottomSheetIsOpen1, setAchievementBottomSheetIsOpen1] = useState(false);
  const [achievementBottomSheetIsOpen2, setAchievementBottomSheetIsOpen2] = useState(false);
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');
  const location: any = useLocation();
  const { achievements } = useSelector((state: RootState) => state.persist.upload);

  useEffect(() => {
    if (achievements.length === 1) {
      setAchievementBottomSheetIsOpen1(true);
    } else if (achievements.length === 2) {
      setAchievementBottomSheetIsOpen1(true);
      setAchievementBottomSheetIsOpen2(true);
    }
  }, []);

  useEffect(() => {
    if (location?.state?.prevPath?.includes('update')) {
      if (location?.state?.updateSuccess) {
        setShowCertificateUpdateSuccessToast(true);
        setTimeout(() => {
          setShowCertificateUpdateSuccessToast(false);
        }, 2000);
      }
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

  return (
    <>
      <CaptureResultHeader />
      <CaptureResultMain />
      <AchievementBottomSheet
        text="?????? ??????"
        achievement={achievements[0]}
        allView
        cancelButtonHandler={() => {
          setAchievementBottomSheetIsOpen1(false);
        }}
        bottomSheetIsOpen={achievementBottomSheetIsOpen1}
      />
      <AchievementBottomSheet
        text="?????? ??????"
        achievement={achievements[1]}
        allView
        cancelButtonHandler={() => {
          setAchievementBottomSheetIsOpen2(false);
        }}
        bottomSheetIsOpen={achievementBottomSheetIsOpen2}
      />
      {showCertificateSuccessToast && <ToastPurpleMessage message="????????? ?????????????????????" />}
      {showCertificateUpdateSuccessToast && <ToastPurpleMessage message="?????? ????????? ?????????????????????" />}
    </>
  );
}

export default CaptureResult;
