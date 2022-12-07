import React, {useEffect} from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureCertificationImg from './components/CaptureCertificationImg';
import CaptureCertificationRecord from './components/CaptureCertificationRecord';
import './CaptureCertificationPage.scss';
import {analytics} from "../../index";

function CaptureCertificationPage() {
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");
  
  useEffect(()=>{
    mutation.mutate({
      params: {
        firebase_screen: "CaptureCertification",
        firebase_screen_class: "CaptureCertificationPage"
      }
    });
  },[]);

  return (
    <>
      <CaptureCertificationImg />
      <CaptureCertificationRecord />
    </>
  );
}

export default CaptureCertificationPage;
