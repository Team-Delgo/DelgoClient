import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import CalendarPage from './pages/calendar/CalendarPage';
import MapPage from './pages/map/MapPage';
import CameraPage from './pages/camera/CameraPage';
import CapturePage from './pages/camera/capture/CapturePage';
import { deviceAction } from './redux/slice/deviceSlice';
import {CAMERA_PATH} from './common/constants/path.const'

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(process.env.REACT_APP_NCP_CLIENT_ID);


  useEffect(() => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf('android') > -1) {
      dispatch(deviceAction.android());
    }
    else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      dispatch(deviceAction.ios());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes location={location}>
        <Route path="/" element={<MapPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path={CAMERA_PATH.MAIN} element={<CameraPage />} />
        <Route path={CAMERA_PATH.CAPTURE} element={<CapturePage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
