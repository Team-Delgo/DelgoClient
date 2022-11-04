import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {
  SpinningCircles,
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  TailSpin,
  ThreeDots,
} from 'react-loading-icons';
import Point from '../../common/icons/point.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import { ROOT_PATH } from '../../common/constants/path.const';
import Checked from '../../common/icons/checked.svg';
import NotChecked from '../../common/icons/not-checked.svg';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getAchievementList, setMainAchievements } from '../../common/api/achievement';
import { GET_ACHIEVEMENT_LIST, CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const';
import './AchievementPage.scss';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne';

interface AchievementDataType {
  achievements: AchievementType;
  achievementsId: number;
  archiveId: number;
  isMain: number;
  registDt: string;
  userId: number;
}

interface AchievementType {
  achievementsId: number;
  imgUrl: string;
  isMain: string;
  isMungple: number;
  name: string;
  registDt: string;
}

function AchievementPage() {
  const [achievementList, setAchievementList] = useState<AchievementDataType[]>([]);
  const [mainAchievementList, setMainAchievementList] = useState<AchievementDataType[]>([]);
  const [showAchievementCompletionAlert, setShowAchievementCompletionAlert] = useState(false);
  const [showAchievementLimitAlert, setShowAchievementLimitAlert] = useState(false);
  const [editActivation, setEditActivation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location: any = useLocation();

  useEffect(() => {
    getgetAchievementDataList();
    console.log(location.state?.rankingPoint);
  }, []);

  const getgetAchievementDataList = async () => {
    await getAchievementList(
      1,
      (response: AxiosResponse) => {
        const { code, data } = response.data;

        const achievementList = data.filter((element: AchievementDataType) => element.isMain === 0);
        setAchievementList(achievementList);

        const mainAchievementList = data.filter((element: AchievementDataType) => element.isMain > 0);
        setMainAchievementList(mainAchievementList);
      },
      dispatch,
    );
  };

  const selectionRepresentativeAchievementsCompletion = () => {
    setMainAchievements(
      1,
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

  const filterRepresentativeAchievements = (achievement: AchievementDataType) => (event: React.MouseEvent) => {
    setTimeout(() => {
      const newMainAchievementList = mainAchievementList.filter(
        (element: AchievementDataType) => element !== achievement,
      );
      setMainAchievementList(newMainAchievementList);
      setAchievementList([...achievementList, achievement]);
    }, 300);
  };

  const selectRepresentativeAchievements = (achievement: AchievementDataType) => (event: React.MouseEvent) => {
    if (mainAchievementList.length < 3) {
      setTimeout(() => {
        const newAchievementList = achievementList.filter((element: AchievementDataType) => element !== achievement);
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

  const moveHomePage = () => {
    navigate(ROOT_PATH);
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

  return (
    <>
      <header className="achievement-page-header">
        <img
          src={PrevArrowBlack}
          className="achievement-page-header-prev-arrow"
          alt="achievement-page-prev-arrow"
          aria-hidden="true"
          onClick={moveHomePage}
        />
        <header className="achievement-page-header-profile">
          <img
            className="achievement-page-header-profile-img"
            src={`${process.env.PUBLIC_URL}/assets/dog-img.png`}
            alt="copy url"
          />
          <div className="achievement-page-header-profile-second">
            <div className="achievement-page-header-profile-second-address">서울시 송파구</div>
            <div className="achievement-page-header-profile-second-name">몽자</div>
          </div>
          <div className="achievement-page-header-profile-third">
            <img
              src={Point}
              alt="copy url"
              width={20}
              height={20}
              className="achievement-page-header-profile-third-point-img"
            />
            <div className="achievement-page-header-profile-third-point">{location.state?.rankingPoint} P</div>
          </div>
        </header>
        <body className="achievement-page-header-achievements">
          <div className="achievement-page-header-achievements-representative">
            <div className="achievement-page-header-achievements-representative-text">몽자의 대표 업적</div>
            {editActivation === false ? (
              <div
                className="achievement-page-header-achievements-representative-button"
                aria-hidden="true"
                onClick={editRepresentativeAchievementsOn}
              >
                설정
              </div>
            ) : (
              <div
                className="achievement-page-header-achievements-representative-button"
                aria-hidden="true"
                onClick={editRepresentativeAchievementsOff}
              >
                완료
              </div>
            )}
          </div>
          <div className="achievement-page-header-achievements-representative-sub-text">
            최대 3개까지 선택 할 수 있어요
          </div>
          <div className="achievement-page-header-achievements-images">
            {mainAchievementList
              .map((achievement: AchievementDataType) => (
                <div
                  className="achievement-page-header-achievements-image-container"
                  aria-hidden="true"
                  onClick={editActivation === true ? filterRepresentativeAchievements(achievement) : undefined}
                >
                  <div className="achievement-page-header-achievements-image" key={achievement.achievementsId}>
                    <img src={achievement.achievements.imgUrl} alt="post-img" />
                  </div>
                  {editActivation === true ? (
                    <img
                      src={Checked}
                      className="achievement-page-header-achievements-image-check-img"
                      alt="post-img"
                      width={20}
                      height={20}
                    />
                  ) : null}
                </div>
              ))}
          </div>
        </body>
      </header>
      <body className="achievement-page-body">
        <div className="achievement-page-body-achievements-title">내가 획득한 업적</div>
        <div className="achievement-page-body-achievements-images">
          {achievementList.map((achievement: AchievementDataType) => (
            <div
              className="achievement-page-body-achievements-image-container"
              aria-hidden="true"
              onClick={editActivation === true ? selectRepresentativeAchievements(achievement) : undefined}
            >
              <div className="achievement-page-body-achievements-image" key={achievement.achievementsId}>
                <img src={achievement.achievements.imgUrl} alt="post-img" />
              </div>
              {editActivation === true ? (
                <img
                  src={NotChecked}
                  className="achievement-page-body-achievements-image-check-img"
                  alt="post-img"
                  width={20}
                  height={20}
                />
              ) : null}
            </div>
          ))}
        </div>
      </body>
      <FooterNavigation />
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
