import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { CAMERA_PATH, ROOT_PATH } from '../../common/constants/path.const';
import CameraTransition from '../../common/icons/camera-transition.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import CameraButton from '../../common/icons/camera-button.svg';
import { uploadAction } from '../../redux/slice/uploadSlice';
import './CameraPage.scss';

function CameraPage() {
  const [webCameraMode, setWwebCameraMode] = useState('user');
  const [capturedImg, setCapturedImg] = useState('');
  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uploadAction.setUploadInit);
  }, []);

  const moveToPreviousPage = () => {
    navigate(ROOT_PATH);
  };

  const swtichCamera = () => {
    if (webCameraMode === 'user') {
      setWwebCameraMode('environment');
    } else {
      setWwebCameraMode('user');
    }
  };

  const captureImg = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      dispatch(uploadAction.setImg({ img: imageSrc }));
      getUserLocation();
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          dispatch(
            uploadAction.setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
          );
          moveToNextPage();
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


  const moveToNextPage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  return (
    <div className="camera-page-backround">
      <img
        src={PrevArrowBlack}
        className="camera-page-prev-arrow"
        alt="camera-page-prev-arrow"
        aria-hidden="true"
        onClick={moveToPreviousPage}
      />
      <img
        src={CameraTransition}
        className="camera-transition-button"
        alt="camera-transition-button"
        aria-hidden="true"
        onClick={swtichCamera}
      />
      {cameraRef === null ? null : (
        <Webcam
          ref={cameraRef}
          className="web-camera"
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize
          mirrored={webCameraMode === 'user'}
          width={window.innerWidth}
          videoConstraints={{
            facingMode: { exact: webCameraMode },
            aspectRatio: 1 / 1,
          }}
        />
      )}
      <img
        src={CameraButton}
        className="camera-capture-button"
        alt="camera-capture-button"
        aria-hidden="true"
        onClick={captureImg}
      />
    </div>
  );
}

export default CameraPage;
