import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorActions } from '../../../../redux/slice/errorSlice';
import ToastMessage from '../../../../common/dialog/ToastMessage';
import './VerifyPhone.scss';
import Timer from './Timer';
import { SIGN_UP_PATH } from '../../../../common/constants/path.const';
import { ReactComponent as Check } from '../../../../common/icons/check.svg';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import { ReactComponent as Exit } from '../../../../common/icons/x.svg';
import { phoneSendMessage, phoneCheckNumber } from '../../../../common/api/signup';

interface LocationState {
  isSocial: string;
}

function VerifyPhone() {
  const navigation = useNavigate();
  const state = useLocation().state as LocationState;
  const { isSocial } = state;
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isSended, setIsSended] = useState(false);
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [isReSended, setIsReSended] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [SMSid, setSMSid] = useState(0);
  const [phoneIsExist, setPhoneIsExist] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const phoneRef = useRef<any>();
  const authRef = useRef<any>();

  const authIsValid = timeIsValid && authNumber.length === 4;
  const isValid = phoneNumber.length === 13;
  const isEntered = phoneNumber.length > 0;

  const buttonClickHandler = () => {
    //  인증번호 전송 요청

    const phone = phoneNumber.slice(0, 3) + phoneNumber.slice(4, 8) + phoneNumber.slice(9, 13);
    phoneSendMessage(
      phone,
      (response: AxiosResponse) => {
        const { code, data } = response.data;

        if (code === 200) {
          setSMSid(data);
          setButtonIsClicked(true);
          setIsSended(true);
          setPhoneIsExist(false);
        } else {
          setPhoneIsExist(true);
          phoneRef.current.focus();
        }
      },
      errorHandler,
    );
  };

  const dispatch = useDispatch();
  const errorHandler = () => {
    dispatch(errorActions.setError());
  };

  useEffect(() => {
    if (buttonIsClicked) {
      setTimeout(() => {
        setButtonIsClicked(false);
      }, 2500);
    }
  }, [buttonIsClicked]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isSended) return;
    const { value } = event.target;
    // const onlyNumber = value.replace(/[^-0-9]/g, '');
    let temp = value;
    if ((value.length === 3 && phoneNumber.length === 2) || (value.length === 8 && phoneNumber.length === 7)) {
      temp = value.concat(' ');
    }

    if ((value.length === 9 && phoneNumber.length === 8) || (value.length === 4 && phoneNumber.length === 3)) {
      temp = `${phoneNumber} ${value.slice(-1)}`;
    }

    if ((value.length === 9 && phoneNumber.length === 10) || (value.length === 4 && phoneNumber.length === 5)) {
      temp = value.slice(0, -1);
    }

    if (phoneNumber.length === 13 && value.length > 13) return;
    setPhoneNumber(temp);
    setPhoneIsExist(false);
  };

  const clearButtonHandler = () => {
    if (isSended) return;
    setPhoneNumber('');
    setPhoneIsExist(false);
  };

  const authChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (authNumber.length === 4 && event.target.value.length > 4) return;
    setAuthNumber(event.target.value);
    setFeedback('');
    setAuthFailed(false);
  };

  const authNumberResend = () => {
    const phone = phoneNumber.slice(0, 3) + phoneNumber.slice(4, 8) + phoneNumber.slice(9, 13);
    phoneSendMessage(
      phone,
      (response: AxiosResponse) => {
        const { code, data } = response.data;

        if (code === 200) {
          setSMSid(data);
          setIsReSended(true);
          setButtonIsClicked(true);
          setTimeIsValid(true);
          setPhoneIsExist(false);
        }
      },
      errorHandler,
    );
    //  인증번호 전송 요청
  };

  const resetIsResend = () => {
    setIsReSended(false);
  };

  const submitAuthNumber = () => {
    setTimeout(() => {
      phoneCheckNumber(
        { number: authNumber, smsId: SMSid },
        (response: AxiosResponse) => {
          const { code } = response.data;
          console.log(response);
          if (code === 200) {
            if (isSocial==='A') {
              navigation(SIGN_UP_PATH.SOCIAL.NICKNAME, { state: { phone: phoneNumber, isSocial, email: '' } });
            } else {
              navigation(SIGN_UP_PATH.USER_INFO, { state: { phone: phoneNumber } });
            }
          } else {
            setFeedback('인증번호를 확인해주세요');
            setAuthFailed(true);
            authRef.current.focus();
          }
        },
        errorHandler,
      );
    }, 200);
  };

  const buttonContext = !isSended ? (
    <button type="button" className={classNames('login-button', { active: isValid })} onClick={buttonClickHandler}>
      인증번호 발송
    </button>
  ) : (
    <button
      type="button"
      disabled={!authIsValid}
      className={classNames('login-button', { active: authIsValid })}
      onClick={submitAuthNumber}
    >
      다음
    </button>
  );

  return (
    <div className="login">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={() =>
          setTimeout(() => {
            navigation(-1);
          }, 200)
        }
      >
        <Arrow />
      </div>
      <header className="login-header">휴대폰 인증</header>
      <span className="login-description phone">원활한 서비스 제공을 위해 휴대폰 번호를 입력해주세요</span>
      <div className="login-inputbox">
        <input
          value={phoneNumber}
          onChange={inputChangeHandler}
          className={classNames('login-input phonenumber', { invalid: phoneIsExist })}
          placeholder="휴대폰 번호"
          autoComplete="off"
          ref={phoneRef}
        />
        <p className={classNames('input-feedback')}>{phoneIsExist && '이미 가입된 전화번호입니다.'}</p>

        <span
          aria-hidden="true"
          className={classNames('login-input-clear', { checked: isSended, isMount: isEntered, isUnMount: !isEntered })}
          onClick={clearButtonHandler}
        >
          {isSended ? <Check /> : <Exit className="login-input-clear-exit" />}
        </span>
      </div>
      {isSended && (
        <div className="login-authnumber">
          <input
            value={authNumber}
            onChange={authChangeHandler}
            className={classNames('login-input authnumber', { invalid: feedback.length })}
            placeholder="인증번호 4자리"
            autoComplete="off"
            type="number"
            ref={authRef}
          />
          <span className="login-timer">
            <Timer isResend={isReSended} resendfunc={resetIsResend} setInValid={() => setTimeIsValid(false)} />
          </span>
          <p aria-hidden="true" className="login-authnumber-resend" onClick={authNumberResend}>
            인증번호 재전송
          </p>
          <p className="input-feedback">{feedback}</p>
        </div>
      )}
      {buttonContext}
      {buttonIsClicked && <ToastMessage message="인증번호가 전송 되었습니다" />}
      {}
    </div>
  );
}
export default VerifyPhone;
