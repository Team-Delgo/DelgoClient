/* eslint-disable react/jsx-boolean-value */
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

function CameraRearPage() {
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
    navigate(CAMERA_PATH.FRONT);
  };

  const captureImg = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      dispatch(uploadAction.setImg({ img: imageSrc }));
      moveToNextPage();
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
      <Webcam
        ref={cameraRef}
        className="web-camera"
        screenshotFormat="image/jpeg"
        // forceScreenshotSourceSize
        width={window.innerWidth}
        mirrored={false}
        videoConstraints={{
          facingMode: { exact: 'enviroment' },
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

export default CameraRearPage;
