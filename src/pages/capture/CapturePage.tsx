import React, { useEffect } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CaptureImgRecord from './components/CaptureImgRecord';
import CaptureImg from './components/CaptureImg';
import { uploadAction } from '../../redux/slice/uploadSlice';
import './CapturePage.scss';
import { RootState } from '../../redux/store';
import PrevArrowBlack from '../../../common/icons/prev-arrow-black.svg';
import { ROOT_PATH } from '../../common/constants/path.const';
import {analytics} from "../../index";


function CapturePage() {
  const dispatch = useDispatch();
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");

  useEffect(() => {
    getUserLocation();
    mutation.mutate({
      params: {
        firebase_screen: "Capture",
        firebase_screen_class: "CapturePage"
      }
    });
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          dispatch(
            uploadAction.setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
          );
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  };

  return (
    <>
      <CaptureImg />
      <CaptureImgRecord />
    </>
  );
}

export default CapturePage;
