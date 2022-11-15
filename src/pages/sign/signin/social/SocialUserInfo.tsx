import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import '../../signup/userinfo/UserInfo.scss';
import { SIGN_UP_PATH } from '../../../../common/constants/path.const';
import { checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from '../../validcheck';
import { emailCheck, nicknameCheck } from '../../../../common/api/signup';
import regions, { regionType, placeType, GetRegion } from '../../signup/userinfo/region';
import Check from '../../../../common/icons/check.svg';
import RegionSelector from '../../signup/userinfo/RegionSelector';

interface LocationState {
  phone: string;
  isSocial: string;
  email: string;
}

interface Input {
  nickname: string;
  region: string;
}

enum Id {
  NICKNAME = 'nickname',
  REGION = 'region',
}

export interface Region {
  indexRegion: number;
  indexPlace: number;
  region: string;
  place: string;
  geoCode: number;
  pGeoCode: number;
}

function SocialUserInfo() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation().state as LocationState;
  const { phone, isSocial, email } = state;
  const [nextPage, setNextPage] = useState(false);
  const [enteredInput, setEnteredInput] = useState({ nickname: '', region: '' });
  const [validInput, setValidInput] = useState({ nickname: '', region: '' });
  const [feedback, setFeedback] = useState({ nickname: '', region: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const [emailDuplicated, setEmailDuplicated] = useState(true);
  const [emailDupCheckFail, setEmailDupCheckFail] = useState(false);
  const [nicknameDuplicated, setNicknameDuplicated] = useState(true);
  const [nicknameDupCheckFail, setNicknameDupCheckFail] = useState(false);
  const [regionList, setRegionList] = useState<regionType[]>();
  const [modalActive, setModalActive] = useState(false);
  const [region, setRegion] = useState<Region>();
  const emailRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const getRegionData = async () => {
    const response = await GetRegion();
    setRegionList(response);
  };

  useEffect(() => {
    getRegionData();
  }, []);

  const nicknameValidCheck = (value: string) => {
    const response = checkNickname(value);

    if (!response.isValid) {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: value };
      });
    }

    setFeedback((prev: Input) => {
      return { ...prev, nickname: response.message };
    });
  };

  const submitHandler = () => {
    //  유저정보 보내기
    setTimeout(() => {
      navigation(SIGN_UP_PATH.USER_PET_INFO, {
        state: {
          nickname: enteredInput.nickname,
          phone,
          email,
          isSocial,
          geoCode: region!.geoCode,
          pGeoCode: region!.pGeoCode,
        },
      });
    }, 200);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });

    if (id === Id.REGION) {
      // console.log(id);
    } else {
      nicknameValidCheck(value);
      setNicknameDuplicated(true);
      setNicknameDupCheckFail(false);
    }
  };

  const nicknameDupCheck = () => {
    nicknameCheck(
      enteredInput.nickname,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          setNicknameDuplicated(false);
          setNicknameDupCheckFail(false);
        } else {
          setNicknameDuplicated(true);
          setNicknameDupCheckFail(true);
          if (nicknameRef.current) {
            nicknameRef.current.focus();
          }
        }
      },
      dispatch,
    );
  };

  const regionChangeHandler = (regionName: string, region: Region) => {
    setEnteredInput((prev) => {
      return {
        ...prev,
        region: regionName,
      };
    });
    setRegion(region);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <div className="login">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={
          !nextPage
            ? () => {
                setTimeout(() => {
                  navigation(-1);
                }, 200);
              }
            : () => setNextPage(false)
        }
      >
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>

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
              <RegionSelector
                list={regionList!}
                close={closeModal}
                change={regionChangeHandler}
                rIndex={region?.indexRegion}
                pIndex={region?.indexPlace}
              />
            </div>
          </div>
        )}
        <span className="login-span">닉네임</span>
        <div className="login-input-box">
          <input
            className={classNames('login-input email', {
              invalid: feedback.nickname || nicknameDupCheckFail,
            })}
            placeholder="닉네임(공백, 특수문자 제외)"
            id={Id.NICKNAME}
            value={enteredInput.nickname}
            autoComplete="off"
            onChange={inputChangeHandler}
            ref={nicknameRef}
          />
          {!nicknameDuplicated && validInput.nickname && (
            <span className={classNames('login-input-clear', { checked: !nicknameDuplicated })}>
              <img src={Check} alt="check" />
            </span>
          )}
          <p className={classNames('input-feedback', { fine: !nicknameDuplicated && validInput.nickname.length })}>
            {nicknameDupCheckFail ? '이미 사용중인 닉네임입니다.' : feedback.nickname}
          </p>
          <span aria-hidden="true" className="input-email-check" onClick={nicknameDupCheck}>
            중복확인
          </span>
        </div>
        <span className="login-span">지역</span>
        <div className="login-input-wrapper">
          <input
            className={classNames('login-input input-location')}
            placeholder="지역"
            value={enteredInput.region}
            id={Id.REGION}
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
        <button
          type="button"
          disabled={!validInput.nickname.length || nicknameDuplicated}
          className={classNames('login-button', { active: validInput.nickname.length && !nicknameDuplicated })}
          onClick={submitHandler}
        >
          다음
        </button>
    </div>
  );
}

export default SocialUserInfo;
