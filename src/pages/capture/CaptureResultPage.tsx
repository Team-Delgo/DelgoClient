import React, {useEffect} from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureResultHeader from './components/CaptureResultHeader';
import CaptureResultMain from './components/CaptureResultMain';
import './CaptureResultPage.scss';
import {analytics} from "../../index";

function CaptureResult() {
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");

  useEffect(()=>{
    mutation.mutate({
      params: {
        firebase_screen: "CaptureResult",
        firebase_screen_class: "CaptureResultPage"
      }
    });
  },[]);

  return (
    <>
      <CaptureResultHeader />
      <CaptureResultMain />
    </>
  );
}

export default CaptureResult;
