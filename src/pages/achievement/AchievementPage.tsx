/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getAchievementList, setMainAchievements } from '../../common/api/achievement';
import './AchievementPage.scss';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne';
import { RootState } from '../../redux/store';
import MainAchievment from './components/MainAchievment';
import Achievment from './components/Achievement';
import { analytics } from '../../index';
import Loading from '../../common/utils/Loading';

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: number;
  name: string;
  registDt: string;
}

function AchievementPage() {
  const [achievementList, setAchievementList] = useState<AchievementType[]>([]);
  const [mainAchievementList, setMainAchievementList] = useState<AchievementType[]>([]);
  const [showAchievementCompletionAlert, setShowAchievementCompletionAlert] = useState(false);
  const [showAchievementLimitAlert, setShowAchievementLimitAlert] = useState(false);
  const [editActivation, setEditActivation] = useState(false);
  const [achievementListCount, setAchievementListCount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.persist.user);
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getgetAchievementDataList();
    mutation.mutate({
      params: {
        firebase_screen: 'Achievement',
        firebase_screen_class: 'AchievementPage',
      },
    });
  }, []);

  const getgetAchievementDataList = () => {
    setIsLoading(true);
    getAchievementList(
      user.id,
      (response: AxiosResponse) => {
        const { code, data } = response.data;

        console.log('data', data);

        const achievementList1 = data.filter((element: AchievementType) => element.isActive === true);
        setAchievementListCount(achievementList1.length);

        const achievementList = data.filter((element: AchievementType) => element.isMain === 0);
        setAchievementList(achievementList);

        const mainAchievementList = data.filter((element: AchievementType) => element.isMain > 0);
        setMainAchievementList(mainAchievementList);
      },
      dispatch,
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const selectionRepresentativeAchievementsCompletion = () => {
    console.log('mainAchievementList', mainAchievementList);
    setMainAchievements(
      user.id,
      mainAchievementList[0] !== undefined ? mainAchievementList[0].achievementsId : 0,
      mainAchievementList[1] !== undefined ? mainAchievementList[1].achievementsId : 0,
      mainAchievementList[2] !== undefined ? mainAchievementList[2].achievementsId : 0,
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        if (code === 200) {
          openAchievementCompletionAlert();
        }
      },
      dispatch,
    );
  };

  const filterRepresentativeAchievements = (achievement: AchievementType) => (event: React.MouseEvent) => {
    setTimeout(() => {
      const newMainAchievementList = mainAchievementList.filter((element: AchievementType) => element !== achievement);
      setMainAchievementList(newMainAchievementList);
      setAchievementList([...achievementList, achievement]);
    }, 300);
  };

  const selectRepresentativeAchievements = (achievement: AchievementType) => (event: React.MouseEvent) => {
    if (mainAchievementList.length < 3) {
      setTimeout(() => {
        const newAchievementList = achievementList.filter((element: AchievementType) => element !== achievement);
        setMainAchievementList([...mainAchievementList, achievement]);
        setAchievementList(newAchievementList);
      }, 300);
    } else {
      openAchievementLimitAlert();
    }
  };

  const editRepresentativeAchievementsOn = () => {
    setEditActivation(true);
  };

  const editRepresentativeAchievementsOff = () => {
    selectionRepresentativeAchievementsCompletion();
    setEditActivation(false);
  };

  const openAchievementCompletionAlert = () => {
    setShowAchievementCompletionAlert(true);
  };

  const closeAchievementCompletionAlert = () => {
    setShowAchievementCompletionAlert(false);
  };

  const openAchievementLimitAlert = () => {
    setShowAchievementLimitAlert(true);
  };

  const closeAchievementLimitAlert = () => {
    setShowAchievementLimitAlert(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainAchievment
        editActivation={editActivation}
        editRepresentativeAchievementsOn={editRepresentativeAchievementsOn}
        editRepresentativeAchievementsOff={editRepresentativeAchievementsOff}
        mainAchievementList={mainAchievementList}
        filterRepresentativeAchievements={filterRepresentativeAchievements}
      />
      <Achievment
        editActivation={editActivation}
        achievementList={achievementList}
        selectRepresentativeAchievements={selectRepresentativeAchievements}
        achievementListCount={achievementListCount}
      />
      {showAchievementCompletionAlert && (
        <AlertConfirmOne text="대표업적 설정이 성공했습니다" buttonHandler={closeAchievementCompletionAlert} />
      )}
      {showAchievementLimitAlert && (
        <AlertConfirmOne text="업적 최대 3개까지만 설정 가능합니다" buttonHandler={closeAchievementLimitAlert} />
      )}
    </>
  );
}

export default AchievementPage;
