import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import PrevArrowWhite from '../icons/prev-arrow-white.svg';
import WhiteCheck from '../icons/white-check.svg';
import "./Crop.scss";

interface CropType {
  img: string;
  cancleImgCrop: () => void;
  showCroppedImage: () => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}

function Crop({ img, cancleImgCrop, showCroppedImage, onCropComplete }: CropType) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="crop-container">
      <img
        src={PrevArrowWhite}
        className="crop-container-prev-arrow"
        alt="crop-wrapper-prev-arrow"
        aria-hidden="true"
        onClick={cancleImgCrop}
      />
      <img
        src={WhiteCheck}
        className="crop-container-complition-check"
        alt="crop-wrapper-complition-check"
        aria-hidden="true"
        onClick={showCroppedImage}
      />
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          // initialCroppedAreaPercentages={{ width: 80, height: 80, x: 10, y: 10 }}
        />
    </div>
  );
}

export default Crop
