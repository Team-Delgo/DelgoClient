import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import { CAMERA_PATH } from '../../common/constants/path.const'
import CameraTransition from '../../common/icons/camera-transition.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import CameraButton  from '../../common/icons/camera-button.svg';
import "./CameraPage.scss";

function CameraPage() {
  const [webCameraMode, setWwebCameraMode] = useState('user');
  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();

  const captureImg = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      navigate(CAMERA_PATH.CAPTURE, { state: { img: imageSrc } });
    }
  };

  const swtichCamera = () => {
    if (webCameraMode === 'user') {
      setWwebCameraMode('environment');
    } else {
      setWwebCameraMode('user');
    }
  };

  const moveToPreviousPage = () => {
    navigate("/map");
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
      <Webcam
        ref={cameraRef}
        className="web-camera"
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize
        mirrored
        width={window.innerWidth}
        videoConstraints={{
          facingMode: { exact: webCameraMode },
          aspectRatio: 1 / 1,
        }}
      />
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

export default CameraPage
