import React from 'react';
import Profile from './components/Profile';
import ActivityLog from './components/ActivityLog';
import Ranking from './components/Ranking';
import FooterNavigation from '../../common/components/FooterNavigation';
import NeighborPosts from './components/NeighborPosts';
import './HomePage.scss';

function HomePage() {
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