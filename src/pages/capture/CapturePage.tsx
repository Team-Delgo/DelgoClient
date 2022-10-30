import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CaptureImgRecord from './components/CaptureImgRecord';
import CaptureImg from './components/CaptureImg';
import { uploadAction } from '../../redux/slice/uploadSlice';
import './CapturePage.scss';
import { RootState } from '../../redux/store';
import PrevArrowBlack from '../../../common/icons/prev-arrow-black.svg';
import { ROOT_PATH } from '../../common/constants/path.const';


function CapturePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLocation();
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
