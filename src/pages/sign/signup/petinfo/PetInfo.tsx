import React, { ChangeEvent, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import imageCompression from 'browser-image-compression';
import { useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { checkPetName } from '../../validcheck';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import { ReactComponent as Camera } from '../../../../common/icons/camera.svg';
import './PetInfo.scss';
import DogType from './DogType';
import BirthSelector from './BirthSelector';
import { signup, petImageUpload } from '../../../../common/api/signup';
import Check from '../../../../common/icons/check.svg';
import { SIGN_UP_PATH } from '../../../../common/constants/path.const';
import { userActions } from '../../../../redux/slice/userSlice';
import { oAuthSignup } from '../../../../common/api/social';
import AlertConfirmOne from '../../../../common/dialog/AlertConfirmOne';
import getCroppedImg from '../../../../common/utils/CropHandle';
import Crop from '../../../../common/utils/Crop';
import { RootState } from '../../../../redux/store';
import { analytics } from '../../../../index';
import PetType from '../pettype/PetType';
import {LocationState, Input, IsValid, croppendAreaPixelType, BreedType, Id} from "./petInfoType";

function PetInfo() {
  const signUpCompleteEvent = useAnalyticsCustomLogEvent(analytics, 'delgo_signup_end');
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const state = useLocation().state as LocationState;
  const { email, password, nickname, phone, isSocial, geoCode, pGeoCode } = state;
  const [image, setImage] = useState<any>();
  const [sendingImage, setSendingImage] = useState<any>([]);
  const [enteredInput, setEnteredInput] = useState<Input>({
    name: '',
    birth: undefined,
    type: { breed: '', code: '' },
  });
  const [nameFeedback, setNameFeedback] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [typeModalActive, setTypeModalActive] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: false,
    birth: false,
    type: false,
  });
  const pageIsValid = isValid.name && isValid.birth && isValid.type;
  const formData = new FormData();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<croppendAreaPixelType>();
  const [compressedFileName, setCompressedFileName] = useState('');
  const { OS } = useSelector((state: RootState) => state.persist.device);

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      console.log('reader.result',reader.result)
      setImage(reader.result);
    };
    const { files } = event.target;
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
    };
  };

  const handlingDataForm = async (dataURI: any) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');

    const formData = new FormData();
    formData.append('photo', file);

    return formData;
  };

  const requireInputCheck = (key: string, value: string) => {
    if (value.length) {
      setIsValid((prev: IsValid) => {
        return { ...prev, [key]: true };
      });
    }
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

  // const typeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { id } = event.target;
  //   setEnteredInput((prev: Input) => {
  //     return { ...prev, type: id };
  //   });
  //   requireInputCheck(Id.TYPE, id);
  // };

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
      return { ...prev, birth: birthday };
    });
    setIsValid((prev: IsValid) => {
      return { ...prev, birth: true };
    });
  };

  const submitHandler = async () => {
    signUpCompleteEvent.mutate();
    const formData = await handlingDataForm(sendingImage);
    let userId = 0;
    const petInfo = {
      name: enteredInput.name,
      birthday: enteredInput.birth,
      size: enteredInput.type,
    };
    const userInfo = {
      userName: nickname,
      email,
      password,
      phone,
      pet: petInfo,
    };
    console.log(userInfo);
    if (isSocial) {
      const requestBody = {
        email,
        userName: nickname,
        phoneNo: phone,
        geoCode,
        pGeoCode,
        petName: enteredInput.name,
        breed: enteredInput.type.code,
        birthday: enteredInput.birth,
        userSocial: isSocial,
      };
      oAuthSignup(
        requestBody,
        (response: AxiosResponse) => {
          const { code, codeMsg, data } = response.data;
          if (code === 200) {
            const accessToken = response.headers.authorization_access;
            const refreshToken = response.headers.authorization_refresh;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            userId = response.data.data.user.userId;
            console.log(response);
            console.log(userId);
            dispatch(
              userActions.signin({
                couponList: [],
                user: {
                  id: data.user.userId,
                  nickname: data.user.name,
                  email: '',
                  phone: data.user.phoneNo,
                  geoCode: data.user.geoCode,
                },
                pet: {
                  petId: data.pet.petId,
                  birthday: data.pet.birthday,
                  breed: data.pet.breed,
                  breedName: data.pet.breedName,
                  name: data.pet.name,
                  image: '',
                },
              }),
            );
            petImageUpload(
              { formData, userId },
              (response: AxiosResponse) => {
                console.log(response);
                const { code, data } = response.data;
                if (code === 200) {
                  dispatch(userActions.setpetprofile({ image: data }));
                }
              },
              dispatch,
            );
            sendFcmTokenHandler(data.user.userId);
            navigation(SIGN_UP_PATH.COMPLETE, { state: { name: enteredInput.name } });
          } else {
            console.log(codeMsg);
          }
        },
        dispatch,
      );
    } else {
      signup(
        {
          userName: nickname,
          email,
          password,
          phoneNo: phone,
          geoCode,
          pGeoCode,

          petName: enteredInput.name,
          breed: enteredInput.type.code,
          birthday: enteredInput.birth,
          userSocial: isSocial,
        },
        async (response: AxiosResponse) => {
          const { code, codeMsg, data } = response.data;
          if (code === 200) {
            const { registDt } = data.user;
            const accessToken = response.headers.authorization_access;
            const refreshToken = response.headers.authorization_refresh;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            userId = response.data.data.user.userId;
            dispatch(
              userActions.signin({
                isSignIn: true,
                couponList: [],
                user: {
                  id: data.user.userId,
                  nickname: data.user.name,
                  email: data.user.email,
                  phone: data.user.phoneNo,
                  isSocial: false,
                  geoCode: data.user.geoCode,
                  address: data.user.address,
                  registDt: `${registDt.slice(0, 4)}.${registDt.slice(5, 7)}.${registDt.slice(8, 10)}`,
                  notify:data.user.notify,
                },
                pet: {
                  petId: data.pet.petId,
                  birthday: data.pet.birthday,
                  breed: data.pet.breed,
                  breedName: data.pet.breedName,
                  name: data.pet.name,
                  image: '',
                },
              }),
            );
            sendFcmTokenHandler(data.user.userId);
            formData.append('photo', sendingImage[0]);
            await petImageUpload(
              { formData, userId },
              (response: AxiosResponse) => {
                console.log(response);
                const { code, data } = response.data;
                if (code === 200) {
                  dispatch(userActions.setpetprofile({ image: data }));
                }
              },
              dispatch,
            );
            navigation(SIGN_UP_PATH.COMPLETE, { state: { name: enteredInput.name } });
          } else {
            console.log(codeMsg);
          }
        },
        dispatch,
      );
    }
  };

  const sendFcmTokenHandler = (userId: number) => {
    if (OS === 'android') {
      window.BRIDGE.sendFcmToken(userId);
    }
    else{
      window.webkit.messageHandlers.sendFcmToken.postMessage(userId);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cancleImgCrop = () => {
    setImage(undefined);
  };

  const showCroppedImage = async () => {
    try {
      const blobFile = await getCroppedImg(image, croppedAreaPixels);
      console.log('blobFile', blobFile);

      const metadata = { type: `image/jpeg` };
      const newFile = new File([blobFile as Blob], compressedFileName, metadata);

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
        setSendingImage(base64data);
        setImage(undefined);
      };
    } catch (e) {
      console.error(e);
    }
  };

  const openTypeModal = () => {
    setTypeModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const closeTypeModal = () => {
    setTypeModalActive(false);
    document.body.style.overflow = 'unset';
  };

  const setDogType = (breed: BreedType) => {
    setEnteredInput((prev) => {
      return { ...prev, type: breed };
    });
    setIsValid((prev) => {
      return { ...prev, type: true };
    });
  };

  const openModal = () => {
    setModalActive(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalActive(false);
    document.body.style.overflow = 'unset';
  };

  if (image !== undefined) {
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
    <div>
    {!typeModalActive && <div className="login petinfo">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={() => {
          setTimeout(() => {
            navigation(-1);
          }, 200);
        }}
      >
        <Arrow />
      </div>
      <header className="login-header">대표 강아지 정보</header>
      <div className="petinfo-image">
        <label htmlFor="pet" className="petinfo-image-label">
          <input
            className="petinfo-image-input"
            type="file"
            accept="image/jpeg,image/gif,image/png;capture=filesystem"
            name="image"
            autoComplete="off"
            id="pet"
            onChange={handleImage}
          />
          <Camera className="petinfo-image-icon" />
        </label>
        <div className="petinfo-image-preview" style={{ backgroundImage: `url(${sendingImage})` }} />
      </div>
      {modalActive && (
        <div>
          <div aria-hidden="true" className="backdrop" onClick={closeModal} />
          <div className="modal">
            <BirthSelector changeBirth={chagneBirthHandler} close={closeModal} />
          </div>
        </div>
      )}
      
      <div className="login-input-box">
        <input
          className={classNames('login-input petname', { invalid: nameFeedback.length })}
          placeholder="강아지 이름 (2~8자)"
          value={enteredInput.name}
          autoComplete="off"
          id={Id.NAME}
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{nameFeedback}</p>
      </div>
      <div className="login-input-wrapper">
        <input
          className={classNames('login-input input-birth')}
          placeholder="생일"
          value={enteredInput.birth}
          id={Id.BIRTH}
          onClick={openModal}
          onFocus={openModal}
          required
          onChange={inputChangeHandler}
        />
      </div>
      <div className="login-input-wrapper">
        <input
          className={classNames('login-input input-birth')}
          placeholder="견종"
          value={enteredInput.type.breed}
          id={Id.TYPE}
          onClick={openTypeModal}
          onFocus={openTypeModal}
          required
          onChange={inputChangeHandler}
        />
      </div>

      <button
        type="button"
        disabled={!pageIsValid}
        className={classNames('login-button', { active: pageIsValid })}
        onClick={() => {
          setTimeout(() => {
            submitHandler();
          }, 300);
        }}
      >
        저장하기
      </button>
    </div>}
    {typeModalActive && <PetType closeModal={closeTypeModal} setType={setDogType} />}
    </div>
  );
}
export default PetInfo;
