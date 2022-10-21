import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import AchievementBath from '../../common/icons/achievement-bath.svg';
import AchievementBeauty from '../../common/icons/achievement-beauty.svg';
import AchievementCafe from '../../common/icons/achievement-cafe.svg';
import Point from '../../common/icons/point.svg';
import PrevArrowBlack from '../../common/icons/prev-arrow-black.svg';
import { ROOT_PATH } from '../../common/constants/path.const';
import AchievementHospital from '../../common/icons/achievement-hospital.svg';
import AchievementRestorant from '../../common/icons/achievement-restorant.svg';
import AchievementWalk from '../../common/icons/achievement-walk.svg';
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
  const [mainAchievementsId, setMainAchievementsId] = useState<Array<number>>([0, 0, 0]);
  const navigate = useNavigate();

  const { isLoading: getAchievementListIsLoading, data: ahievementList } = useQuery(
    GET_ACHIEVEMENT_LIST,
    () => getAchievementList(1),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      //   onError: (error: any) => {
      //     useErrorHandlers(dispatch, error);
      //   },
    },
  );

  const handleMainAchievements = () => {
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

  // const handleMainAchievements = () => {
  //   setMainAchievements;
  // };

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
          <img src={`${process.env.PUBLIC_URL}/assets/dog-img.png`} alt="copy url" />
          <div className="achievement-page-dog-header-profile-detail">
            <div className="achievement-page-header-profile-detail-first">
              <div>서울시 송파구</div>
              <img src={Point} alt="point-img" />
            </div>
            <div className="achievement-page-header-profile-detail-second">
              <div>다크서은</div>
              <div className="achievement-page-header-profile-detail-second-point">12.000P</div>
            </div>
          </div>
        </header>
        <body className="achievement-page-header-achievements">
          <div className="achievement-page-header-achievements-representative">
            <div className="achievement-page-header-achievements-representative-text">몽자의 대표 업적</div>
            <div className="achievement-page-header-achievements-representative-button">등록/수정</div>
          </div>
          <div className="achievement-page-header-achievements-representative-sub-text">
            최대 3개의 업적을 대표업적으로 선정 할 수 있어요!
          </div>
          <div className="achievement-page-header-achievements-images">
            {ahievementList?.data
              .filter((a: AchievementDataType) => a.isMain !== 0)
              .sort((a: AchievementDataType, b: AchievementDataType) => a.isMain - b.isMain)
              .map((achievement: AchievementDataType) => (
                <div className="achievement-page-header-achievements-image" key={achievement.achievementsId}>
                  <img src={achievement.achievements.imgUrl} alt="post-img" />
                </div>
              ))}
          </div>
        </body>
      </header>
      <body className="achievement-page-body">
        <div className="achievement-page-body-achievements-title">내가 획득한 업적</div>
        <div className="achievement-page-body-achievements-images">
          {ahievementList?.data.map((achievement: AchievementDataType) => (
            <div className="achievement-page-body-achievements-image" key={achievement.achievementsId}>
              <img src={achievement.achievements.imgUrl} alt="post-img" />
            </div>
          ))}
        </div>
      </body>
      <FooterNavigation />
    </>
  );
}

export default AchievementPage;
