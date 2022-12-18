import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessCode } from '../../../../common/api/social';
import { ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../../../../common/constants/path.const';
import { userActions } from '../../../../redux/slice/userSlice';
import AlertConfirm from '../../../../common/dialog/AlertConfirm';
import AlertConfirmOne from '../../../../common/dialog/AlertConfirmOne';
import Loading from '../../../../common/utils/Loading';
import { RootState } from '../../../../redux/store';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoRedirectHandler() {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code');
  const [userData, setUserData] = useState({ phone: '', email: '' });
  const [signUp, setSignUp] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const { OS } = useSelector((state: RootState) => state.persist.device);

  useEffect(() => {
    if (code == null) {
      navigate('/user/signin');
    }
    getAccessToken();
  }, []);

  const getAccessToken = () => {
    setAccessCode(
      code,
      (response: AxiosResponse) => {
        console.log(response);
        const { code, data } = response.data;
        if (code === 200) {
          const { registDt } = data.user;
          console.log('로그인 성공');
          dispatch(
            userActions.signin({
              isSignIn: true,
              user: {
                id: data.user.userId,
                address: data.user.address,
                nickname: data.user.name,
                email: data.user.email,
                phone: data.user.phoneNo,
                isSocial:true,
                registDt: `${registDt.slice(0, 4)}.${registDt.slice(5, 7)}.${registDt.slice(8, 10)}`,
                userSocial: data.user.userSocial,
                geoCode: data.user.geoCode,
                notify:data.user.notify,
              },
              pet: {
                petId: data.pet.petId,
                birthday: data.pet.birthday,
                breed: data.pet.breed,
                breedName: data.pet.breedName,
                name: data.pet.name,
                image: data.user.profile,
              },
            }),
          );
          const accessToken = response.headers.authorization_access;
          const refreshToken = response.headers.authorization_refresh;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          sendFcmTokenHandler(data.user.userId);
          navigate(ROOT_PATH, { replace: true });
        } else if (code === 370) {
          console.log('소셜 회원가입');
          setUserData({ phone: data.phoneNo, email: data.email, });
          setSignUp(true);
        } else if (code === 380) {
          console.log('카카오 전화번호 x');
          navigate(SIGN_UP_PATH.SOCIAL.NO_PHONE, { state: { social: '카카오' } });
        } else if (code === 381) {
          console.log('다른 로그인');
          navigate(SIGN_UP_PATH.SOCIAL.OTHER, { state: { social: data.userSocial, email: data.email } });
        } else {
          console.log('카카오 가입 에러');
          setLoginFailed(true);
        }
      },
      () => { console.log(1); },
      dispatch,
    );
  };

  const sendFcmTokenHandler = (userId: number) => {
    if (OS === 'android') {
      window.BRIDGE.sendFcmToken(userId);
    }
    else{
      console.log(1)
    }
  };

  const moveToPreviousPage = () => {
    navigate('/user/signin');
  };

  const moveToSignUpPage = () => {
    navigate(SIGN_UP_PATH.TERMS, { state: { isSocial: 'K', phone: userData.phone, email: userData.email } });
  };

  return (
    <div>
      <Loading />
      {signUp && <AlertConfirm
        text="카카오로 가입된 계정이 없습니다"
        buttonText="회원가입"
        yesButtonHandler={moveToSignUpPage}
        noButtonHandler={moveToPreviousPage}
      />}
      {loginFailed && <AlertConfirmOne text='카카오 로그인에 실패하였습니다' buttonHandler={moveToPreviousPage} />}
    </div>
  );
}

export default KakaoRedirectHandler;
