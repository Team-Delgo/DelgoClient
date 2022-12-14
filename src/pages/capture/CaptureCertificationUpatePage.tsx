import React, { useEffect } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureCertificationUpdateImg from './components/CaptureCertificationUpdateImg';
import CaptureCertificationUpdateRecord from './components/CaptureCertificationUpdateRecord';
import './CaptureCertificationUpatePage.scss';
import { analytics } from '../../index';

function CaptureCertificationUpatePage() {
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');

  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: 'CaptureCertificationUpdate',
        firebase_screen_class: 'CaptureCertificationUpdatePage',
      },
    });
  },[]);

  return (
    <>
      <CaptureCertificationUpdateImg />
      <CaptureCertificationUpdateRecord />
    </>
  );
}

export default CaptureCertificationUpatePage;
