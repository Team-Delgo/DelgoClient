import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureResultHeader from './components/CaptureResultHeader';
import CaptureResultMain from './components/CaptureResultMain';
import './CaptureResultPage.scss';
import { analytics } from '../../index';
import ToastSuccessMessage from '../../common/dialog/ToastSuccessMessage';

function CaptureResult() {
  const [showCertificateSuccessToast, setShowCertificateSuccessToast] = useState(false);
  const [showCertificateUpdateSuccessToast, setShowCertificateUpdateSuccessToast] = useState(false);
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');
  const location: any = useLocation();

  useEffect(() => {
    if (location?.state?.prevPath?.includes('result')) {
      setShowCertificateSuccessToast(true);
      setTimeout(() => {
        setShowCertificateSuccessToast(false);
      }, 2000);
    } else {
      setShowCertificateUpdateSuccessToast(true);
      setTimeout(() => {
        setShowCertificateUpdateSuccessToast(false);
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
      {showCertificateSuccessToast && <ToastSuccessMessage message="인증에 성공하였습니다" />}
      {showCertificateUpdateSuccessToast && <ToastSuccessMessage message="인증 수정에 성공하였습니다" />}
    </>
  );
}

export default CaptureResult;
