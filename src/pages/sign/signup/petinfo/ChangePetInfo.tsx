import React, { ChangeEvent, useState,useCallback } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { checkPetName } from '../../validcheck';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import { ReactComponent as Camera } from '../../../../common/icons/camera.svg';
import './PetInfo.scss';
import DogType from './DogType';
import BirthSelector from './BirthSelector';
import { petImageUpload } from '../../../../common/api/signup';
import Check from '../../../../common/icons/check.svg';
import { userActions } from '../../../../redux/slice/userSlice';
import { MY_ACCOUNT_PATH } from '../../../../common/constants/path.const';
import { changePetInfo } from '../../../../common/api/myaccount';
import { RootState } from '../../../../redux/store';
import AlertConfirmOne from '../../../../common/dialog/AlertConfirmOne';
import PrevArrowWhite from '../../../../common/icons/prev-arrow-white.svg';
import WhiteCheck from '../../../../common/icons/white-check.svg';
import getCroppedImg from '../../../../common/utils/CropHandle';
import Crop from '../../../../common/utils/Crop';

interface Input {
  name: string;
  birthday: string | undefined;
  type: string;
}

interface IsValid {
  name: boolean;
  birth: boolean;
  type: boolean;
}

interface croppendAreaPixelType {
  height: number;
  width: number;
  x: number;
  y: number;
}

enum Id {
  NAME = 'name',
  BIRTH = 'birth',
  TYPE = 'type',
}

const reviewImgExtension = ["image/jpeg","image/gif","image/png","image/jpg"]

function ChangePetInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const state = useSelector((state: RootState) => state.persist.user.pet);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const userEmail = useSelector((state: RootState) => state.persist.user.user.email);
  const { petId, birthday, name, size, image: petImage } = state;

  const [image, setImage] = useState<any>(petImage);
  const [sendingImage, setSendingImage] = useState<any>(petImage);
  const [enteredInput, setEnteredInput] = useState<Input>({ name, birthday, type: size });
  const [nameFeedback, setNameFeedback] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [isOpenDogType, setIsOpenDogType] = useState(false);
  const [imageisChanged, setImageIsChanged] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: true,
    birth: true,
    type: true,
  });
  const [reviewImgExtensionAlert,setReviewImgExtensionAlert]=useState(false)
  const pageIsValid = isValid.name && isValid.birth && isValid.type;
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<croppendAreaPixelType>();
  const [compressedFileName, setCompressedFileName] = useState('');
  
  const isChecked = { s: false, m: false, l: false };
  if (enteredInput.type === 'S') {
    isChecked.s = true;
  } else if (enteredInput.type === 'M') {
    isChecked.m = true;
  } else {
    isChecked.l = true;
  }

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if(!reviewImgExtension.includes((event.target.files as FileList)[0].type)){
      setReviewImgExtensionAlert(true)
      return
    }
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    const { files } = event.target;
    // let {petImage} = files;
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(event.target.files![0], options);
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
    const base64data = reader.result;
    console.log(compressedFile.type);
    setSendingImage(base64data);
    }
    setImageIsChanged(true);
  };

  const requireInputCheck = (key: string, value: string) => {
    if (value.length) {
      setIsValid((prev: IsValid) => {
        return { ...prev, [key]: true };
      });
    }
  };

  const handlingDataForm = async (dataURI:any) => {
    const byteString = atob(dataURI.split(",")[1]);
  
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i+=1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg"
    });
    const file = new File([blob], "image.jpg");
  
    const formData = new FormData();
    formData.append("photo", file);

    return formData;
  };

  const nameInputCheck = (name: string) => {
    const response = checkPetName(name);
    if (!response.isValid) {
      setIsValid((prev: IsValid) => {
        return { ...prev, name: false };
      });
    } else {
      setIsValid((prev: IsValid) => {
        return { ...prev, name: true };
      });
    }
    setNameFeedback(response.message);
  };

  const typeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, type: id };
    });
    requireInputCheck(Id.TYPE, id);
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
    if (id === Id.NAME) {
      nameInputCheck(value);
    } else {
      requireInputCheck(id, value);
    }
  };

  const chagneBirthHandler = (year: number, month: number, day: number) => {
    const birthday = `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`;
    setEnteredInput((prev: Input) => {
      return { ...prev, birthday };
    });
    setIsValid((prev: IsValid) => {
      return { ...prev, birth: true };
    });
  };

  const submitHandler = async () => {
    const petInfo = {
      name: enteredInput.name,
      birthday: enteredInput.birthday,
      size: enteredInput.type,
    };
    const data = {
      email: userEmail,
      name: enteredInput.name,
      birthday: enteredInput.birthday,
      size: enteredInput.type,
    };
    console.log(imageisChanged);
    changePetInfo(
      data,
      dispatch,
      (response: AxiosResponse) => {
        console.log(response);
      },
    );
    if (imageisChanged) {
      const formData = await handlingDataForm(sendingImage);
      petImageUpload(
        { formData, userId },
        (response: AxiosResponse) => {
          console.log(response);
        },
        dispatch,
      );
    }
    console.log(userId);
    dispatch(
      userActions.changepetinfo({
        name: enteredInput.name,
        birth: enteredInput.birthday,
        size: enteredInput.type,
        image: sendingImage,
      }),
    );
    navigation(MY_ACCOUNT_PATH.MAIN);

    // 비동기 처리
    // signup({ email, password, nickname, phone, pet: {petName:enteredInput.name,petBirth:enteredInput.birth,petImage:} }, () => {});
  };

  const alertReviewImgExtensionClose = useCallback(() => {
    setReviewImgExtensionAlert(false)
  },[])

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cancleImgCrop = () => {
    setImage(petImage);
  };

  const showCroppedImage = async () => {
    try {
      const blobFile = await getCroppedImg(image, croppedAreaPixels);
      console.log('blobFile', blobFile);

      const metadata = { type: `image/jpeg` };
      const newFile = new File([blobFile as Blob], compressedFileName, metadata);
      // const croppedImage = URL.createObjectURL(newFile);


      const reader = new FileReader();
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(newFile, options);
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(compressedFile.type);
        console.log('base64data',base64data)
        setSendingImage(base64data);
        setImage(petImage)
      };
    } catch (e) {
      console.error(e);
    }
  };

  if (image !== petImage) {
    return (
      <Crop
        img={image}
        cancleImgCrop={cancleImgCrop}
        showCroppedImage={showCroppedImage}
        onCropComplete={onCropComplete}
      />
    );
  }

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">대표 강아지 정보수정</header>
      <div className="petinfo-image">
        <label htmlFor="pet" className="petinfo-image-label">
          <input
            className="petinfo-image-input"
            type="file"
            accept="image/jpeg,image/gif,image/png;capture=filesystem"
            name="image"
            id="pet"
            autoComplete="off"
            onChange={handleImage}
          />
          <Camera className="petinfo-image-icon" />
        </label>
        <div className="petinfo-image-preview" style={{ backgroundImage: `url(${sendingImage})` }} />
      </div>
      {modalActive && (
        <div>
          <div
            aria-hidden="true"
            className="backdrop"
            onClick={() => {
              setModalActive(false);
            }}
          />
          <div className="modal">
            <BirthSelector changeBirth={chagneBirthHandler} close={()=>{setModalActive(false)}}/>
          </div>
        </div>
      )}
      <div className="login-input-box">
        <input
          className={classNames('login-input petname', { invalid: nameFeedback.length })}
          placeholder="강아지 이름(2~8자)"
          value={enteredInput.name}
          id={Id.NAME}
          autoComplete="off"
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{nameFeedback}</p>
      </div>
      <div className="login-input-wrapper">
        <input
          className={classNames('login-input input-birth')}
          placeholder="생일"
          value={enteredInput.birthday}
          id={Id.BIRTH}
          autoComplete="off"
          onClick={() => {
            setModalActive(true);
          }}
          onFocus={() => {
            setModalActive(true);
          }}
          required
          onChange={inputChangeHandler}
        />
      </div>
      <div className="dogtype">
        <div
          className="dogtype-help"
          aria-hidden="true"
          onClick={() => {
            setIsOpenDogType(!isOpenDogType);
          }}
        >
          ?
          <DogType mount={isOpenDogType} />
        </div>
        <label htmlFor="S">
          <input
            type="radio"
            checked={isChecked.s}
            id="S"
            name="dogtype"
            className="dogtype-input"
            onChange={typeChangeHandler}
          />
          <span className="dogtype-button">
            <img className={classNames('checkbox-icon', { invisible: modalActive })} src={Check} alt="check" />
          </span>
          소형견
        </label>
        <label htmlFor="M">
          <input
            type="radio"
            checked={isChecked.m}
            id="M"
            name="dogtype"
            className="dogtype-input"
            onChange={typeChangeHandler}
          />
          <span className="dogtype-button">
            <img className={classNames('checkbox-icon', { invisible: modalActive })} src={Check} alt="check" />
          </span>
          중형견
        </label>
        <label htmlFor="L">
          <input
            type="radio"
            checked={isChecked.l}
            id="L"
            name="dogtype"
            className="dogtype-input"
            onChange={typeChangeHandler}
          />
          <span className="dogtype-button">
            <img className={classNames('checkbox-icon', { invisible: modalActive })} src={Check} alt="check" />
          </span>
          대형견
        </label>
      </div>

      <button
        type="button"
        disabled={!pageIsValid}
        className={classNames('login-button', { active: pageIsValid })}
        onClick={submitHandler}
      >
        저장하기
      </button>
      {reviewImgExtensionAlert && <AlertConfirmOne text="이미지 확장자 파일만 올려주세요" buttonHandler={alertReviewImgExtensionClose} />}
    </div>
  );
}
export default ChangePetInfo;