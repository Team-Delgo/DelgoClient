import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import AchievementBath from '../../common/icons/achievement-bath.svg';
import AchievementBeauty from '../../common/icons/achievement-beauty.svg';
import AchievementCafe from '../../common/icons/achievement-cafe.svg';
import Point from '../../common/icons/point.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import { ROOT_PATH } from '../../common/constants/path.const';
import AchievementHospital from '../../common/icons/achievement-hospital.svg';
import AchievementRestorant from '../../common/icons/achievement-restorant.svg';
import AchievementWalk from '../../common/icons/achievement-walk.svg';
import Checked from '../../common/icons/checked.svg';
import NotChecked from '../../common/icons/not-checked.svg';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getAchievementList,setMainAchievements } from '../../common/api/achievement';
import { GET_ACHIEVEMENT_LIST, CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const';
import './AchievementPage.scss';



interface AchievementDataType {
  achievements:AchievementType;
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
  const [mainAchievementsId, setMainAchievementsId] = useState<Array<number>>([0, 0, 0]);
  const [editActivation, setEditActivation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetgetAchievementList();
    console.log(1)
  }, []);

  // const { isLoading: getAchievementListIsLoading, data: ahievementList } = useQuery(
  //   GET_ACHIEVEMENT_LIST,
  //   () => getAchievementList(1),
  //   {
  //     cacheTime: CACHE_TIME,
  //     staleTime: STALE_TIME,
  //     //   onError: (error: any) => {
  //     //     useErrorHandlers(dispatch, error);
  //     //   },
  //   },
  // );

  const handleGetgetAchievementList = async () => {
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
      mainAchievementsId[0],
      mainAchievementsId[1],
      mainAchievementsId[2],
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        if (code === 200) {
          console.log(data);
        } else {
          window.alert(codeMsg);
        }
      },
    );
  };

  const filterRepresentativeAchievements = (achievement: AchievementDataType) => (event: React.MouseEvent) => {
    const newMainAchievementList = mainAchievementList.filter(
      (element: AchievementDataType) => element !== achievement,
    );
    setMainAchievementList(newMainAchievementList);
    setAchievementList([...achievementList, achievement]);
  };

  const selectRepresentativeAchievements = (achievement: AchievementDataType) => (event: React.MouseEvent) => {
    if (mainAchievementList.length < 3) {
      console.log(achievementList)
      const newAchievementList = achievementList.filter((element: AchievementDataType) => element !== achievement);
      console.log(newAchievementList)
      setAchievementList(newAchievementList);
      setMainAchievementList([...mainAchievementList, achievement]);
    }
  };

  const editRepresentativeAchievementsOn = () => {
    setEditActivation(true);
  };

  const editRepresentativeAchievementsOff = () => {
    setEditActivation(false);
  };

  const moveHomePage = () => {
    navigate(ROOT_PATH);
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
            <div className="achievement-page-header-profile-third-point">12,000P</div>
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
              .sort((a: AchievementDataType, b: AchievementDataType) => a.isMain - b.isMain)
              .map((achievement: AchievementDataType) => (
                <div
                  className="achievement-page-header-achievements-image-container"
                  aria-hidden="true"
                  onClick={filterRepresentativeAchievements(achievement)}
                >
                  <div className="achievement-page-header-achievements-image" key={achievement.achievementsId}>
                    <img src={AchievementHospital} alt="post-img" />
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
          {achievementList
            // .filter((achievement: AchievementDataType) => achievement.isMain === 0)
            .map((achievement: AchievementDataType) => (
              <div
                className="achievement-page-body-achievements-image-container"
                aria-hidden="true"
                onClick={selectRepresentativeAchievements(achievement)}
              >
                <div className="achievement-page-body-achievements-image" key={achievement.achievementsId}>
                  <img src={AchievementHospital} alt="post-img" />
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
                {/* <img
                src={Checked}
                className="achievement-page-body-achievements-image-check-img"
                alt="post-img"
                width={20}
                height={20}
              /> */}
              </div>
            ))}
        </div>
      </body>
      <FooterNavigation />
    </>
  );
}

export default AchievementPage;
