import React, {useEffect} from 'react'
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import CaptureCertificationImg from './components/CaptureCertificationImg';
import CaptureLocationRecord from './components/CaptureLocationRecord';
import './CaptureLocationPage.scss';
import {analytics} from "../../index";

function CaptureLocationPage() {
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");

  useEffect(()=>{
    mutation.mutate({
      params: {
        firebase_screen: "NeighborRanking",
        firebase_screen_class: "NeighborRankingPage"
      }
    });
  },[]);

  return (
    <>
    <CaptureCertificationImg />
    <CaptureLocationRecord />
  </>
  )
}

export default CaptureLocationPage