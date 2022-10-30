import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  KAKAO_REDIRECT_HANDLE_PATH,
  NAVER_REDIRECT_HANDLE_PATH,
  APPLE_REDIRECT_HANDLE_PATH,
} from './common/constants/path.const';
import CalendarPage from './pages/calendar/CalendarPage';
import MapPage from './pages/map/MapPage';
import CameraPage from './pages/camera/CameraPage';
import CapturePage from './pages/certification/capture/CapturePage';
import CaptureCategoryPage from './pages/certification/capture/CaptureCategoryPage';
import CaptureResultPage from './pages/certification/capture/CaptureResultPage';
import CaptureLocationPage from './pages/certification/capture/CaptureLocationPage';
import Photo from './pages/photo/Photo';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/post/PostsPage';
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

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(process.env.REACT_APP_NCP_CLIENT_ID);

  useEffect(() => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf('android') > -1) {
      dispatch(deviceAction.android());
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      dispatch(deviceAction.ios());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes location={location}>
        <Route path={ROOT_PATH} element={<HomePage />} />
        <Route path={SIGN_IN_PATH.MAIN} element={<SignIn />} />
        <Route path={SIGN_IN_PATH.SIGNIN} element={<Login/>} />
        <Route path={SIGN_IN_PATH.FINDPASSWORD} element={<FindPassword/>} />
        <Route path={SIGN_IN_PATH.PHONEAUTH} element={<PhoneAuth/>} />
        <Route path={SIGN_IN_PATH.RESETPASSWORD} element={<ResetPassword/>} />
        <Route path={SIGN_UP_PATH.TERMS} element={<Terms />} />
        <Route path={SIGN_UP_PATH.VERIFY} element={<VerifyPhone />} />
        <Route path={SIGN_UP_PATH.USER_INFO} element={<UserInfo />} />
        <Route path={SIGN_UP_PATH.USER_PET_INFO} element={<PetInfo />} />
        <Route path={SIGN_UP_PATH.COMPLETE} element={<SignUpComplete />} />
        <Route path={RECORD_PATH.MAP} element={<MapPage />} />
        <Route path={RECORD_PATH.CALENDAR} element={<CalendarPage />} />
        <Route path={RECORD_PATH.PHOTO} element={<Photo />} />
        <Route path={CAMERA_PATH.MAIN} element={<CameraPage />} />
        <Route path={CAMERA_PATH.CAPTURE} element={<CapturePage />} />
        <Route path={CAMERA_PATH.CATEGORY} element={<CaptureCategoryPage />} />
        <Route path={CAMERA_PATH.LOCATION} element={<CaptureLocationPage />} />
        <Route path={CAMERA_PATH.RESULT} element={<CaptureResultPage />} />
        <Route path={POSTS_PATH} element={<PostsPage />} />
        <Route path={ACHIEVEMENT_PATH} element={<AchievementPage />} />
        <Route path={KAKAO_REDIRECT_HANDLE_PATH} element={<KakaoRedirectHandler />} />
        <Route path={APPLE_REDIRECT_HANDLE_PATH} element={<AppleRedirectHandler />} />
        <Route path={NAVER_REDIRECT_HANDLE_PATH} element={<NaverRedirectHandler />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
