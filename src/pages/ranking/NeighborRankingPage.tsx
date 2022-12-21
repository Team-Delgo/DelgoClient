import React, { useEffect } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import './NeighborRankingPage.scss';
import { analytics } from '../../index';
import MyPetInfo from './components/MyPetInfo';
import RankingList from './components/RankingList';

function NeighborRankingPage() {
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');

  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: 'NeighborRanking',
        firebase_screen_class: 'NeighborRankingPage',
      },
    });
    window.scroll(0, 0);
  }, []);

  return (
    <div className="neighbor-ranking-page">
      <MyPetInfo />
      <RankingList />
    </div>
  );
}

export default NeighborRankingPage;
