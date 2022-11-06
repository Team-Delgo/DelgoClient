import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
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
  const [imgExtensionAlert,setImgExtensionAlert]=useState(false)
  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(uploadAction.setUploadInit);
  }, []);

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
    setImgExtensionAlert(false)
  }

  const captureImg = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      dispatch(uploadAction.setImg({ img: imageSrc, tool: 'camera' }));
      moveToNextPage();
    }
  };

  const handleOpenFileUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }

  const uploadImg = (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      if (!imgExtension.includes((event.target.files as FileList)[0].type)) {
        setImgExtensionAlert(true); 
        return;
      }
      console.log(event.target.files[0])
      const galleryImg = URL.createObjectURL(event.target.files[0]);

      dispatch(uploadAction.setImg({ img: galleryImg, tool: 'gallery', file: event.target.files[0] }));
      setImg(galleryImg)
      // moveToNextPage();
    }
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [img,setImg] = useState('')

  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [croppedImage, setCroppedImage] = useState<any>(null)
  
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels)
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels);
      console.log(croppedImage);

      const filename = (croppedImage as string).split('/').pop(); // url 구조에 맞게 수정할 것
      const metadata = { type: `image/jpeg` };
      const newFile = new File([croppedImage as string], filename!, metadata);

      setCroppedImage(croppedImage);
      dispatch(uploadAction.setImg({ img: croppedImage, tool: 'gallery', file: newFile }));
      moveToNextPage()
    } catch (e) {
      console.error(e);
    }
  };

  if (img !== '') {
    return (
      <>
        {/* <div className="crop-container"> */}
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
        {/* </div> */}
        <div className="crop-button-wrapper">
          <button type="submit" onClick={showCroppedImage}>
            선택
          </button>
        </div>
      </>
    );
  }

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
        <Webcam
          ref={cameraRef}
          className="web-camera"
          screenshotFormat="image/jpeg"
          // forceScreenshotSourceSize
          width={window.innerWidth}
          mirrored
          videoConstraints={{
            facingMode: { exact: 'user' },
            aspectRatio: 1 / 1,
          }}
        />
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

export default CameraFrontPage;
