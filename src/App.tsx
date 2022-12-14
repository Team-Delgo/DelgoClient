import React, { useEffect, lazy } from 'react';
import  { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { deviceAction } from './redux/slice/deviceSlice';
import {
  CAMERA_PATH,
  RECORD_PATH,
  ROOT_PATH,
  POSTS_PATH,
  ACHIEVEMENT_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  NEIGHBOR_RANKING_PATH,
  KAKAO_REDIRECT_HANDLE_PATH,
  NAVER_REDIRECT_HANDLE_PATH,
  APPLE_REDIRECT_HANDLE_PATH,
  MY_ACCOUNT_PATH,
} from './common/constants/path.const';
// import CalendarPage from './pages/calendar/CalendarPage';
import MapPage from './pages/map/MapPage';
import CameraFrontPage from './pages/camera/CameraFrontPage';
import CameraRearPage from './pages/camera/CameraRearPage';
import CapturePage from './pages/capture/CapturePage';
import CaptureCertificationPage from './pages/capture/CaptureCertificationPage';
import CaptureCertificationResultPage from './pages/capture/CaptureCertificationResultPage';
import CaptureLocationPage from './pages/capture/CaptureLocationPage';
import CaptureCertificationUpatePage from './pages/capture/CaptureCertificationUpatePage';
import Photo from './pages/photo/Photo';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/certification/CertificationPostsPage';
import AchievementPage from './pages/achievement/AchievementPage';
import './App.scss';
import SignIn from './pages/sign/signin/SignIn';
import Terms from './pages/sign/signup/term/Terms';
import VerifyPhone from './pages/sign/signup/phone/VerifyPhone';
import UserInfo from './pages/sign/signup/userinfo/UserInfo';
import SignUpComplete from './pages/sign/signup/SignUpComplete';
import PetInfo from './pages/sign/signup/petinfo/PetInfo';
import KakaoRedirectHandler from './pages/sign/signin/social/KakaoRedirectHandler';
import NaverRedirectHandler from './pages/sign/signin/social/NaverRedirectHandler';
import AppleRedirectHandler from './pages/sign/signin/social/AppleRedirectHandler';
import Login from './pages/sign/signin/Login';
import FindPassword from './pages/sign/password/FindPassword';
import ResetPassword from './pages/sign/password/ResetPassword';
import PhoneAuth from './pages/sign/password/PhoneAuth';
import NeighborRankingPage from './pages/ranking/NeighborRankingPage';
import MyAccountPage from './pages/myaccount/MyAccountPage';
import { RootState } from './redux/store';
import ChangePetInfo from './pages/sign/signup/petinfo/ChangePetInfo';
import RecordCertificationPage from './pages/certification/RecordCertificationPage';
import SocialUserInfo from './pages/sign/signin/social/SocialUserInfo';
import SocialExist from './pages/sign/signin/social/SocialExist';
import CommentsPage from './pages/comment/CommentsPage';
import Setting from './pages/myaccount/Setting';
import ChangeUserInfo from './pages/myaccount/ChangeUserInfo';
import ChangePasswordCheck from './pages/myaccount/ChangePasswordCheck';
import ChangePassword from './pages/myaccount/ChangePassword';
import CalendarPage from './pages/calendar/CalendarPage';
import { errorActions } from './redux/slice/errorSlice';
import { userActions } from './redux/slice/userSlice';
import ServiceTerm from './pages/myaccount/term/ServiceTerm';
import ToastPurpleMessage from './common/dialog/ToastPurpleMessage';
import { getMyInfo } from './common/api/myaccount';


declare global {
  interface Window {
    BRIDGE: any;
    webkit: any;
    kakao: any;
  }
}

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const hasError = useSelector((state: RootState) => state.persist.error.hasError);
  const tokenExpriedError = useSelector((state: RootState) => state.persist.error.tokenExpried);
  const {isSignIn,user} = useSelector((state: RootState) => state.persist.user);


  useEffect(() => {
    if (isSignIn) {
      getMyInfo(
        user.id,
        (response: AxiosResponse) => {
          const { code, data } = response.data;
          if (code === 200) {
            console.log('data',data)
            const { registDt } = data.user;
            dispatch(
              userActions.signin({
                isSignIn: true,
                user: {
                  id: data.user.userId,
                  address: data.user.address,
                  nickname: data.user.name,
                  email: data.user.email,
                  phone: data.user.phoneNo,
                  isSocial: false,
                  geoCode: data.user.geoCode,
                  registDt: `${registDt.slice(0, 4)}.${registDt.slice(5, 7)}.${registDt.slice(8, 10)}`,
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
          }
        },
        dispatch,
      );
    }
  }, []);

  useEffect(() => {
    const pcDevice = 'win16|win32|win64|mac|macintel';
    if (navigator.platform) {
      if (pcDevice.indexOf(navigator.platform.toLowerCase()) < 0) {
        dispatch(deviceAction.mobile());
      } else {
        dispatch(deviceAction.pc());
      }
    }
  }, []);


  useEffect(() => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf('android') > -1) {
      dispatch(deviceAction.android());
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      dispatch(deviceAction.ios());
    }
  }, []);

  useEffect(() => {
    console.log('hasError',hasError)
    if (hasError) {
      setTimeout(() => {
        ConfirmNetworkError();
      }, 2300);
    }
  }, [hasError]);

  useEffect(() => {
    if (tokenExpriedError) {
      setTimeout(() => {
        ConfirmLoginSessionExpried();
      }, 2300);
    }
  }, [tokenExpriedError]);


  const ConfirmNetworkError = () => {
    dispatch(errorActions.setFine());
  };

  const ConfirmLoginSessionExpried = () => {
    dispatch(errorActions.setTokenFine());
    dispatch(userActions.signout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigation(SIGN_IN_PATH.MAIN);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {hasError && <ToastPurpleMessage message="??????????????? ??????????????????" />}
      {tokenExpriedError && <ToastPurpleMessage message="????????? ????????? ?????????????????????." />}
      <Routes location={location}>
        <Route path={ROOT_PATH} element={<HomePage />} />
        <Route path={SIGN_IN_PATH.MAIN} element={<SignIn />} />
        <Route path={SIGN_IN_PATH.SIGNIN} element={<Login />} />
        <Route path={SIGN_IN_PATH.FINDPASSWORD} element={<FindPassword />} />
        <Route path={SIGN_IN_PATH.PHONEAUTH} element={<PhoneAuth />} />
        <Route path={SIGN_IN_PATH.RESETPASSWORD} element={<ResetPassword />} />
        <Route path={SIGN_UP_PATH.TERMS} element={<Terms />} />
        <Route path={SIGN_UP_PATH.VERIFY} element={<VerifyPhone />} />
        <Route path={SIGN_UP_PATH.USER_INFO} element={<UserInfo />} />
        <Route path={SIGN_UP_PATH.SOCIAL.NICKNAME} element={<SocialUserInfo />} />
        <Route path={SIGN_UP_PATH.USER_PET_INFO} element={<PetInfo />} />
        <Route path={SIGN_UP_PATH.COMPLETE} element={<SignUpComplete />} />
        <Route path={SIGN_UP_PATH.SOCIAL.OTHER} element={<SocialExist />} />
        {/* <Route path="/preventback" element={<PreventBack />} /> */}
        <Route path={RECORD_PATH.MAP} element={<MapPage />} />
        <Route path={RECORD_PATH.CALENDAR} element={<CalendarPage />} />
        <Route path={RECORD_PATH.PHOTO} element={<Photo />} />
        <Route path={RECORD_PATH.CERT} element={<RecordCertificationPage />} />
        <Route path={RECORD_PATH.COMMENT} element={<CommentsPage />} />
        <Route path={CAMERA_PATH.FRONT} element={<CameraFrontPage />} />
        <Route path={CAMERA_PATH.REAR} element={<CameraRearPage />} />
        <Route path={CAMERA_PATH.CAPTURE} element={<CapturePage />} />
        <Route path={CAMERA_PATH.CERTIFICATION} element={<CaptureCertificationPage />} />
        <Route path={CAMERA_PATH.LOCATION} element={<CaptureLocationPage />} />
        <Route path={CAMERA_PATH.UPDATE} element={<CaptureCertificationUpatePage />} />
        <Route path={CAMERA_PATH.RESULT} element={<CaptureCertificationResultPage />} />
        <Route path={POSTS_PATH} element={<PostsPage />} />
        <Route path={ACHIEVEMENT_PATH} element={<AchievementPage />} />
        <Route path={NEIGHBOR_RANKING_PATH} element={<NeighborRankingPage />} />
        <Route path={MY_ACCOUNT_PATH.MAIN} element={<MyAccountPage />} />
        <Route path={MY_ACCOUNT_PATH.PETINFO} element={<ChangePetInfo />} />
        <Route path={MY_ACCOUNT_PATH.SETTINGS} element={<Setting />} />
        <Route path={MY_ACCOUNT_PATH.USERINFO} element={<ChangeUserInfo />} />
        <Route path={MY_ACCOUNT_PATH.PASSWORDCHECK} element={<ChangePasswordCheck />} />
        <Route path={MY_ACCOUNT_PATH.PASSWORDCHANGE} element={<ChangePassword />} />
        <Route path={MY_ACCOUNT_PATH.TERM1} element={<ServiceTerm id={1} />} />
        <Route path={MY_ACCOUNT_PATH.TERM2} element={<ServiceTerm id={2} />} />
        <Route path={KAKAO_REDIRECT_HANDLE_PATH} element={<KakaoRedirectHandler />} />
        <Route path={APPLE_REDIRECT_HANDLE_PATH} element={<AppleRedirectHandler />} />
        <Route path={NAVER_REDIRECT_HANDLE_PATH} element={<NaverRedirectHandler />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
