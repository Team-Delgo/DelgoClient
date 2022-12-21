/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAchievementList, setMainAchievements } from '../../common/api/achievement';
import './AchievementPage.scss';
import { RootState } from '../../redux/store';
import MainAchievment from './components/MainAchievment';
import Achievment from './components/Achievement';
import { analytics } from '../../index';
import Loading from '../../common/utils/Loading';
import ToastPurpleMessage from '../../common/dialog/ToastPurpleMessage';
import AchievementBottomSheet from '../../common/dialog/AchievementBottomSheet';
import { achievementType } from '../../common/types/achievement';

function AchievementPage() {
  const [achievementList, setAchievementList] = useState<achievementType[]>([]);
  const [mainAchievementList, setMainAchievementList] = useState<achievementType[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<achievementType>();
  const [mainAchievementSuccessToastIsOpen, setMainAchievementSuccessToastIsOpen] = useState(false);
  const [mainAchievementLimitToastIsOpen, setMainAchievementLimitToastIsOpen] = useState(false);
  const [editActivation, setEditActivation] = useState(false);
  const [achievementBottomSheetIsOpen, setAchievementBottomSheetIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [achievementListCount, setAchievementListCount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.persist.user);
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');

  useEffect(() => {
    getgetAchievementDataList();
    mutation.mutate({
      params: {
        firebase_screen: 'Achievement',
        firebase_screen_class: 'AchievementPage',
      },
    });
  }, []);

  useEffect(() => {
    if (mainAchievementSuccessToastIsOpen) {
      setTimeout(() => {
        closeAchievementCompletionToast();
      }, 2000);
    }
  }, [mainAchievementSuccessToastIsOpen]);

  useEffect(() => {
    if (mainAchievementLimitToastIsOpen) {
      setTimeout(() => {
        closeAchievementLimitToast();
      }, 2000);
    }
  }, [mainAchievementLimitToastIsOpen]);

  const getgetAchievementDataList = () => {
    setIsLoading(true);
    getAchievementList(
      user.id,
      (response: AxiosResponse) => {
        const { data } = response.data;

        const achievementList1 = data.filter((element: achievementType) => element.isActive === true);
        setAchievementListCount(achievementList1.length);

        const achievementList = data.filter((element: achievementType) => element.isMain === 0);
        setAchievementList(achievementList);

        const mainAchievementList = data.filter((element: achievementType) => element.isMain > 0);
        setMainAchievementList(mainAchievementList);
      },
      dispatch,
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  const selectionRepresentativeAchievementsCompletion = () => {
    setMainAchievements(
      user.id,
      mainAchievementList[0] !== undefined ? mainAchievementList[0].achievementsId : 0,
      mainAchievementList[1] !== undefined ? mainAchievementList[1].achievementsId : 0,
      mainAchievementList[2] !== undefined ? mainAchievementList[2].achievementsId : 0,
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        if (code === 200) {
          openAchievementCompletionToast();
        }
      },
      dispatch,
    );
  };

  const filterRepresentativeAchievements = (achievement: achievementType) => (event: React.MouseEvent) => {
    setTimeout(() => {
      const newMainAchievementList = mainAchievementList.filter((element: achievementType) => element !== achievement);
      setMainAchievementList(newMainAchievementList);
      setAchievementList([...achievementList, achievement]);
    }, 300);
  };

  const selectRepresentativeAchievements = (achievement: achievementType) => (event: React.MouseEvent) => {
    if (mainAchievementList.length < 3) {
      setTimeout(() => {
        const newAchievementList = achievementList.filter((element: achievementType) => element !== achievement);
        setMainAchievementList([...mainAchievementList, achievement]);
        setAchievementList(newAchievementList);
      }, 300);
    } else {
      openAchievementLimitToast();
    }
  };

  const editRepresentativeAchievementsOn = useCallback(() => {
    setEditActivation(true);
  }, []);

  const editRepresentativeAchievementsOff = useCallback(() => {
    selectionRepresentativeAchievementsCompletion();
    setEditActivation(false);
  }, []);

  const openAchievementCompletionToast = useCallback(() => {
    setMainAchievementSuccessToastIsOpen(true);
  }, []);

  const closeAchievementCompletionToast = useCallback(() => {
    setMainAchievementSuccessToastIsOpen(false);
  }, []);

  const openAchievementLimitToast = useCallback(() => {
    setMainAchievementLimitToastIsOpen(true);
  }, []);

  const closeAchievementLimitToast = useCallback(() => {
    setMainAchievementLimitToastIsOpen(false);
  }, []);

  const openBottomSheet = useCallback(
    (achievement: achievementType) => (event: React.MouseEvent) => {
      setSelectedAchievement(achievement);
      setTimeout(() => {
        setAchievementBottomSheetIsOpen(true);
      }, 200);
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setAchievementBottomSheetIsOpen(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainAchievment
        editActivation={editActivation}
        mainAchievementList={mainAchievementList}
        editRepresentativeAchievementsOn={editRepresentativeAchievementsOn}
        editRepresentativeAchievementsOff={editRepresentativeAchievementsOff}
        filterRepresentativeAchievements={filterRepresentativeAchievements}
        openBottomSheet={openBottomSheet}
      />
      <Achievment
        editActivation={editActivation}
        achievementList={achievementList}
        achievementListCount={achievementListCount}
        selectRepresentativeAchievements={selectRepresentativeAchievements}
        openBottomSheet={openBottomSheet}
      />
      <AchievementBottomSheet
        text=""
        allView={false}
        achievement={selectedAchievement}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={achievementBottomSheetIsOpen}
      />
      {mainAchievementSuccessToastIsOpen && <ToastPurpleMessage message="대표업적 설정이 성공했습니다." />}
      {mainAchievementLimitToastIsOpen && <ToastPurpleMessage message="업적 최대 3개까지만 설정 가능합니다." />}
    </>
  );
}

export default AchievementPage;
