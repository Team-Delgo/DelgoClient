import React from 'react';
import Profile from './components/Profile';
import ActivityLog from './components/ActivityLog';
import Ranking from './components/Ranking';
import FooterNavigation from '../../common/components/FooterNavigation';
import './HomePage.scss';

function HomePage() {
  return (
    <>
      <Profile />
      <ActivityLog />
      <Ranking />
      <FooterNavigation />
    </>
  );
}

export default HomePage;
