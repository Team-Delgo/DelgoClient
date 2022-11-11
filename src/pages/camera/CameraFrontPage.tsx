import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import {Camera} from "react-camera-pro";
import { CAMERA_PATH, ROOT_PATH } from '../../common/constants/path.const';
import CameraTransition from '../../common/icons/camera-transition.svg';
import Gallery from '../../common/icons/gallery.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import CameraButton from '../../common/icons/camera-button.svg';
import { uploadAction } from '../../redux/slice/uploadSlice';
import './CameraPage.scss';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne';
import getCroppedImg from '../../common/utils/CropImg';


const imgExtension = ["image/jpeg","image/gif","image/png","image/jpg"]

function CameraFrontPage() {
  const [imgExtensionAlert, setImgExtensionAlert] = useState(false);
  const [compressedFileName, setCompressedFileName] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [img, setImg] = useState('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [devices, setDevices] = useState<any>([]);
  const [devicesId, setDevicesId] = useState<any>();
  const camera = useRef<any>(null);
  const [cameraLoading, setCameraLoading] = useState(true);

  useEffect(() => {
    dispatch(uploadAction.setUploadInit);
    // deviceCheck();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (camera.current !== null) {
        const img = camera.current.getScreenshot();
        if (img.includes('data') === true) {
          console.log(img);
          setCameraLoading(false)
          clearInterval(interval);
        }
      }
    }, 100);
  }, []);

  // const handleDevices = (mediaDevices: any) => {
  //   setDevices(mediaDevices.filter(({ kind }: any) => kind === 'videoinput'));
  // };

  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then(handleDevices);
  // }, [handleDevices]);

  function deviceCheck() {
    const pcDevice = 'win16|win32|win64|mac|macintel';
    if (navigator.platform) {
      if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
        console.log('MOBILE');
      } else {
        console.log('PC');
      }
    }
  }

  const moveToPreviousPage = () => {
    navigate(ROOT_PATH);
  };

  const swtichCamera = () => {
    navigate(CAMERA_PATH.REAR);
  };

  const moveToNextPage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  const alertReviewImgExtensionClose = () => {
    setImgExtensionAlert(false);
  };

  const captureImg = () => {
    if (camera.current) {
      const imageSrc = camera.current.getScreenshot()
      dispatch(uploadAction.setImg({ img: imageSrc, tool: 'camera' }));
      moveToNextPage();
    }
  };

  const handleOpenFileUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const uploadImg = (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      if (!imgExtension.includes((event.target.files as FileList)[0].type)) {
        setImgExtensionAlert(true);
        return;
      }
      setCompressedFileName(event.target.files[0].name);
      const galleryImg = URL.createObjectURL(event.target.files[0]);
      console.log('event.target.files[0]', event.target.files[0]);
      setImg(galleryImg);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const blobFile = await getCroppedImg(img, croppedAreaPixels);
      console.log('blobFile', blobFile);

      const metadata = { type: `image/jpeg` };
      const newFile = new File([blobFile as Blob], compressedFileName, metadata);
      const croppedImage = URL.createObjectURL(newFile);

      console.log('newFile', newFile);
      console.log('croppedImage', croppedImage);

      dispatch(uploadAction.setImg({ img: croppedImage, tool: 'gallery', file: newFile }));
      moveToNextPage();
    } catch (e) {
      console.error(e);
    }
  };

  if (img !== '') {
    return (
      <>
        <div className="crop-wrapper">
          <Cropper
            image={img}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="crop-button-wrapper">
          <button type="submit" onClick={showCroppedImage}>
            선택
          </button>
        </div>
      </>
    );
  }
  const asd = () => {
    console.log(1)
    // setCameraLoading(false);
  };

  const asd2 = () => {
    console.log(2)
    // setCameraLoading(true);
  };

  // if (switchCameraLoading === true) {
  //   return <div>로딩중</div>;
  // }

  return (
    <>
      <div className="camera-page-backround">
        <img
          src={PrevArrowBlack}
          className="camera-page-prev-arrow"
          alt="camera-page-prev-arrow"
          aria-hidden="true"
          onClick={moveToPreviousPage}
        />
        {/* <div className="web-camera">
          <Camera
            ref={camera}
            aspectRatio={1}
            facingMode="user"
            numberOfCamerasCallback={asd}
            errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined,
            }}
          />
        </div> */}
        <Webcam
          ref={camera}
          // style={{ visibility: 'hidden' }}
          style={{ visibility: cameraLoading ? 'hidden' : 'visible' }}
          className="web-camera"
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          width={window.innerWidth}
          onUserMedia={asd}
          onUserMediaError={asd2}
          mirrored
          videoConstraints={{
            facingMode: { exact: 'user' },
            aspectRatio: 1 / 1,
            deviceId: devicesId,
          }}
        />
        <div className="camera-page-icon-container">
          {/* <img src={Gallery} alt="gallery-button" aria-hidden="true" onClick={handleOpenFileUpload} /> */}
          <img
            className="camera-button"
            src={CameraButton}
            alt="camera-capture-button"
            aria-hidden="true"
            onClick={captureImg}
          />
          <img src={CameraTransition} alt="camera-transition-button" aria-hidden="true" onClick={swtichCamera} />
        </div>
        <input
          type="file"
          accept="image/jpeg,image/gif,image/png,image/jpg;capture=filesystem"
          ref={fileUploadRef}
          onChange={uploadImg}
          style={{ display: 'none' }}
        />
      </div>
      {imgExtensionAlert && (
        <AlertConfirmOne text="이미지 확장자 파일을 올려주세요" buttonHandler={alertReviewImgExtensionClose} />
      )}
    </>
  );
}

export default CameraFrontPage;
