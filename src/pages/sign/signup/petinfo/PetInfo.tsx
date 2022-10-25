import React, { ChangeEvent, useState, useCallback } from 'react';
import classNames from 'classnames';
import imageCompression from 'browser-image-compression';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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

interface LocationState {
  phone: string;
  email: string;
  nickname: string;
  password: string;
  isSocial: string;
  geoCode: number;
  pGeoCode: number;
}

interface Input {
  name: string;
  birth: string | undefined;
  type: string;
}

interface IsValid {
  name: boolean;
  birth: boolean;
  type: boolean;
}

enum Id {
  NAME = 'name',
  BIRTH = 'birth',
  TYPE = 'type',
}
const reviewImgExtension = ['image/jpeg', 'image/gif', 'image/png', 'image/jpg'];

function PetInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const state = useLocation().state as LocationState;
  const { email, password, nickname, phone, isSocial, geoCode, pGeoCode } = state;
  const [image, setImage] = useState<any>();
  const [sendingImage, setSendingImage] = useState<any>([]);
  const [enteredInput, setEnteredInput] = useState<Input>({ name: '', birth: undefined, type: '' });
  const [nameFeedback, setNameFeedback] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [isOpenDogType, setIsOpenDogType] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: false,
    birth: false,
    type: false,
  });
  const [reviewImgExtensionAlert, setReviewImgExtensionAlert] = useState(false);
  const pageIsValid = isValid.name && isValid.birth && isValid.type;
  const formData = new FormData();

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!reviewImgExtension.includes((event.target.files as FileList)[0].type)) {
      setReviewImgExtensionAlert(true);
      return;
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
    };

    // let {petImage} = files;
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
      return { ...prev, birth: birthday };
    });
    setIsValid((prev: IsValid) => {
      return { ...prev, birth: true };
    });
  };

  const submitHandler = async () => {
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
      // oauthSignup();
      const requestBody = {
        email,
        userName: nickname,
        phoneNo: phone,
        petName: enteredInput.name,
        petSize: enteredInput.type,
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
            console.log(accessToken);
            console.log(refreshToken);
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
                },
                pet: {
                  petId: data.pet.petId,
                  birthday: data.pet.birthday,
                  size: data.pet.size,
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
          petSize: enteredInput.type,
          birthday: enteredInput.birth,
          userSocial: isSocial,
        },
        async (response: AxiosResponse) => {
          const { code, codeMsg, data } = response.data;
          if (code === 200) {
            const accessToken = response.headers.authorization_access;
            const refreshToken = response.headers.authorization_refresh;
            console.log(accessToken);
            console.log(refreshToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            userId = response.data.data.user.userId;
            console.log(response);
            console.log(userId);
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
                },
                pet: {
                  petId: data.pet.petId,
                  birthday: data.pet.birthday,
                  size: data.pet.size,
                  name: data.pet.name,
                  image: '',
                },
              }),
            );
            console.log(1, userId);
            formData.append('photo', sendingImage[0]);
            console.log(sendingImage[0]);
            console.log(formData);
            await petImageUpload(
              { formData, userId },
              (response: AxiosResponse) => {
                console.log(response);
                const { code, data } = response.data;
                if (code === 200) {
                  dispatch(userActions.setpetprofile({ image }));
                }
              },
              dispatch,
            );
            console.log(2);
            navigation(SIGN_UP_PATH.COMPLETE, { state: { name: enteredInput.name } });
          } else {
            console.log(codeMsg);
          }
        },
        dispatch,
      );
    }

    // 비동기 처리
    // signup({ email, password, nickname, phone, pet: {petName:enteredInput.name,petBirth:enteredInput.birth,petImage:} }, () => {});
  };

  const alertReviewImgExtensionClose = useCallback(() => {
    setReviewImgExtensionAlert(false);
  }, []);

  return (
    <div className="login">
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
        <div className="petinfo-image-preview" style={{ backgroundImage: `url(${image})` }} />
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
            <BirthSelector changeBirth={chagneBirthHandler} />
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
          <input type="radio" id="S" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className={classNames('checkbox-icon', { invisible: modalActive })} src={Check} alt="check" />
          </span>
          소형견
        </label>
        <label htmlFor="M">
          <input type="radio" id="M" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className={classNames('checkbox-icon', { invisible: modalActive })} src={Check} alt="check" />
          </span>
          중형견
        </label>
        <label htmlFor="L">
          <input type="radio" id="L" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
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
        onClick={() => {
          setTimeout(() => {
            submitHandler();
          }, 300);
        }}
      >
        저장하기
      </button>
      {reviewImgExtensionAlert && (
        <AlertConfirmOne text="이미지 확장자 파일만 올려주세요" buttonHandler={alertReviewImgExtensionClose} />
      )}
    </div>
  );
}
export default PetInfo;
