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
    // const mobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());

    // if (mobile) {
    //   // 유저에이전트를 불러와서 OS를 구분합니다.

    //   let userAgent = navigator.userAgent.toLowerCase();

    //   if (userAgent.search('android') > -1) currentOS = 'android';
    //   else if (userAgent.search('iphone') > -1 || userAgent.search('ipod') > -1 || userAgent.search('ipad') > -1)
    //     currentOS = 'ios';
    //   else currentOS = 'else';
    // } else {
    //   // 모바일이 아닐 때

    //   currentOS = 'nomobile';
    // }

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
