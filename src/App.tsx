import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { deviceAction } from './redux/slice/deviceSlice';
import { CAMERA_PATH, RECORD_PATH, ROOT_PATH, POSTS_PATH, ACHIEVEMENT_PATH } from './common/constants/path.const';
import CalendarPage from './pages/calendar/CalendarPage';
import MapPage from './pages/map/MapPage';
import CameraPage from './pages/camera/CameraPage';
import CapturePage from './pages/camera/capture/CapturePage';
import CaptureCategoryPage from './pages/camera/capture/CaptureCategoryPage';
import CaptureResultPage from './pages/camera/capture/CaptureResultPage';
import Photo from './pages/photo/Photo';
import HomePage from './pages/home/HomePage';
import PostsPage from './pages/post/PostsPage';
import AchievementPage from './pages/achievement/AchievementPage';
import './App.scss';

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
        <Route path={RECORD_PATH.MAP} element={<MapPage />} />
        <Route path={RECORD_PATH.CALENDAR} element={<CalendarPage />} />
        <Route path={RECORD_PATH.PHOTO} element={<Photo />} />
        <Route path={CAMERA_PATH.MAIN} element={<CameraPage />} />
        <Route path={CAMERA_PATH.CAPTURE} element={<CapturePage />} />
        <Route path={CAMERA_PATH.CATEGORY} element={<CaptureCategoryPage />} />
        <Route path={CAMERA_PATH.RESULT} element={<CaptureResultPage />} />
        <Route path={POSTS_PATH} element={<PostsPage />} />
        <Route path={ACHIEVEMENT_PATH} element={<AchievementPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
