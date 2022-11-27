import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './SignIn.scss';
import { AxiosResponse } from 'axios';
import { createBrowserHistory } from 'history';
import AppleLogin from 'react-apple-login';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as KakaoButton } from '../../../common/icons/kakao.svg';
import { ReactComponent as Naver } from '../../../common/icons/naver.svg';
import { ReactComponent as Apple } from '../../../common/icons/apple.svg';
import { ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../../../common/constants/path.const';
import { KAKAO, NAVER } from '../../../common/constants/url.cosnt';
import { checkEmail } from '../validcheck';
import { emailAuth } from '../../../common/api/login';
import Loading from '../../../common/utils/Loading';
import AppleLoginButton from './social/AppleLogin';

declare global {
  interface Window {
    BRIDGE: any;
    webkit: any;
    Kakao: any;
  }
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  
  const preventGoBack = () => {
    window.history.pushState(null, '', window.location.href);
    console.log('prevent go back!');
  };

  useEffect(() => {
    window.Kakao.init('1fc2794c1008fd96115d7f57e7f68e04');
    console.log(window.Kakao.isInitialized());
    if(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')){
      navigation('/');
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
    
  }, []);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    const response = checkEmail(value);
    setFeedback(response.message);
  };

  const buttonClickHandler = () => {
    emailAuth(
      email,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          navigation(SIGN_IN_PATH.SIGNIN, { state: { email } });
        } else {
          setFeedback('가입되지 않은 이메일입니다.');
        }
      },
      dispatch,
    );
  };

  const kakaoIntentUrl = `intent://${KAKAO.KAKAO_AUTH_URL.replace(/https?:\/\//i, '')}#Intent;scheme=http;package=com.android.chrome;end`

  return (
    <div className="login-signin">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="login-title-wrapper">
            <div className="login-title1">우리집 강아지도</div>
            <div className="login-title2">델고가요</div>
            <div className="login-subtitle">동반 장소를 발견하고 저장하세요</div>
          </div>
          <div className="login-input-flex">
            <div className="login-input-box">
              <input
                placeholder="이메일"
                autoComplete="off"
                onChange={inputChangeHandler}
                value={email}
                ref={emailRef}
                className={classNames('login-input email', { invalid: feedback.length })}
              />
              <p className="login-feedback">{feedback}</p>
            </div>

            <button type="button" className="login-button active signup" onClick={buttonClickHandler}>
              계속
            </button>
            <div className="login-signup-wrapper">
              <div
                aria-hidden="true"
                className="login-signup-text"
                onClick={() => {
                  navigation(SIGN_UP_PATH.TERMS, { state: { isSocial: false } });
                }}
              >
                회원가입
              </div>
            </div>
            <div className="login-social-header">소셜 로그인</div>
            <div className="login-social">
              <div aria-hidden="true" onClick={()=>{
                window.Kakao.Auth.authorize({
                  redirectUri: `${process.env.REACT_APP_BASE_URL}/oauth/callback/kakao`
                })
                }}>
                <button type="button" className="login-kakao">
                  <KakaoButton className="icon" />
                </button>
              </div>
              <a href={NAVER.NAVER_AUTH_URL}>
                <button type="button" className="login-naver">
                  <Naver className="icon" />
                </button>
              </a>
              <div className="login-apple">
              <Apple className="icon" />
                <AppleLoginButton />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignIn;
