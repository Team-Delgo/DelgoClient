import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import CalendarPage from './pages/CalendarPage';
import MapPage from './pages/MapPage';


function App() {
  const queryClient = new QueryClient();
  const location = useLocation();

  console.log(process.env.REACT_APP_NCP_CLIENT_ID);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes location={location}>
        <Route path="/" element={<MapPage/>}/>
        <Route path="/map" element={<CalendarPage/>}/>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
