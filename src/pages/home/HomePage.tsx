import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Profile from './components/Profile';
import ActivityLog from './components/ActivityLog';
import Ranking from './components/Ranking';
import FooterNavigation from '../../common/components/FooterNavigation';
import NeighborPosts from './components/NeighborPosts';
import './HomePage.scss';
import { SIGN_IN_PATH } from '../../common/constants/path.const';
import { scrollActions } from '../../redux/slice/scrollSlice';

function HomePage() { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scrollActions.scrollInit());
    window.scroll(0, 0);
    const token = window.localStorage.getItem('accessToken');
    if (!token) {
      navigate(SIGN_IN_PATH.MAIN);
    }
  }, []);

  return (
    <>
      <Profile />
      <ActivityLog />
      <Ranking />
      <NeighborPosts />
      <FooterNavigation />
    </>
  );
}

export default HomePage;
