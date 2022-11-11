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

function CameraRearPage() {
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
  const [devicesId, setDevicesId] = useState<any>();
  const [devices, setDevices] = useState<any>([]);
  const camera = useRef<any>(null);
  const [switchCameraLoading, setSwitchCameraLoading] = useState(false);

  useEffect(() => {
    dispatch(uploadAction.setUploadInit);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (camera.current !== null) {
        camera.current.takePhoto();
      }
    }, 500);
  }, []);

  const handleDevices = (mediaDevices: any) => {
   setDevices(mediaDevices.filter(({ kind }: any) => kind === 'videoinput'));
  };


  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const moveToPreviousPage = () => {
    navigate(ROOT_PATH);
  };

  const swtichCamera = () => {
    navigate(CAMERA_PATH.FRONT);
  };

  const moveToNextPage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  const alertReviewImgExtensionClose = () => {
    setImgExtensionAlert(false);
  };

  const captureImg = () => {
    if (camera.current) {
      // const imageSrc = cameraRef.current.getScreenshot();
      const imageSrc = camera.current.takePhoto()
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
      setImg(galleryImg)
    }
  };



  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const blobFile = await getCroppedImg(img, croppedAreaPixels);
      console.log('blobFile',blobFile);
      

      const metadata = { type: `image/jpeg` };
      const newFile = new File([ blobFile as Blob], compressedFileName, metadata);
      const croppedImage = URL.createObjectURL(newFile);

      console.log('newFile',newFile)
      console.log('croppedImage',croppedImage)

      dispatch(uploadAction.setImg({ img: croppedImage, tool: 'gallery', file: newFile }));
      moveToNextPage();
    } catch (e) {
      console.error(e);
    }
  }

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
    console.log(1);
  };

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
        <div className="web-camera">
          <Camera
            ref={camera}
            aspectRatio={1}
            facingMode="environment"
            numberOfCamerasCallback={asd}
            errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined,
            }}
          />
        </div>
        {/* {devices.map((device: any, key: any) => (
          <div key={device.id}>
            <Webcam
              audio={false}
              screenshotQuality={1}
              width={window.innerWidth}
              mirrored={false}
              videoConstraints={{ facingMode: { exact: 'environment' }, aspectRatio: 1 / 1, deviceId: device.deviceId }}
              key={device.id}
            />
            {device.label || `Device ${key + 1}`}
          </div>
        ))} */}
        {/* <Webcam
          ref={cameraRef}
          className="web-camera"
          screenshotFormat="image/jpeg"
          // forceScreenshotSourceSize
          screenshotQuality={1}
          width={window.innerWidth}
          mirrored={false}
          videoConstraints={{
            facingMode: { exact: 'environment' },
            aspectRatio: 1 / 1,
            deviceId:devicesId
          }}
        /> */}
        <div className="camera-page-icon-container">
          <img src={Gallery} alt="gallery-button" aria-hidden="true" onClick={handleOpenFileUpload} />
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


export default CameraRearPage;
