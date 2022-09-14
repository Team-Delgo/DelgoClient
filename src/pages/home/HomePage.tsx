import React from 'react';
import Profile from './components/Profile';
import ActivityLog from './components/ActivityLog';
import Ranking from './components/Ranking';
import './HomePage.scss';
import FooterNavigation from '../../common/components/FooterNavigation';

function HomePage() {
  return (
    <>
      <Profile />
      <body className="home-page-dog-history-body">
        <ActivityLog />
        <Ranking />
      </body>
      <FooterNavigation/>
    </>
  );
}

export default HomePage;
