import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import './MyAccountPage.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import RightArrow from '../../common/icons/right-arrow.svg';
import RightArrowGray from '../../common/icons/right-arrow-gray.svg';
import { MY_ACCOUNT_PATH, ROOT_PATH, SIGN_IN_PATH } from '../../common/constants/path.const';
import { RootState } from '../../redux/store';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import { userActions } from '../../redux/slice/userSlice';

interface rankingType {
  geoCode: string;
  ranking: number;
  userId: number;
  weeklyPoint: number;
}

const neighborRankingPageBodyStyle = { minHeight: window.innerHeight - 260 };

function MyAccountPage() {
  const dispatch = useDispatch();
  const { OS } = useSelector((state: RootState) => state.persist.device);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const pet = useSelector((state: RootState) => state.persist.user.pet);
  const { name, image } = pet;
  const location: any = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // const moveToKakaoPlusFriend = useCallback(() => {
  //   if (OS === 'android') {
  //     window.BRIDGE.goToPlusFriends();
  //   } else {
  //     window.webkit.messageHandlers.goToPlusFriends.postMessage('');
  //   }
  // },[])

  const logoutHandler = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    dispatch(userActions.signout());
    navigate(SIGN_IN_PATH.MAIN);
  };

  return (
    <div className="my-account-page">
      <img
        aria-hidden="true"
        className="my-account-page-back"
        src={LeftArrow}
        alt="back"
        onClick={() => {
          navigate(ROOT_PATH);
        }}
      />
      <div className="my-account-page-title">내 정보</div>
      <header className="my-account-page-header">
        <body className="my-account-page-header-my-pet">
          <img className="my-account-page-header-my-pet-img" src={image} alt="copy url" />
          <div className="my-account-page-header-my-pet-profile">
            <div className="my-account-page-header-my-pet-profile-name">
              {name}
              <img
                src={RightArrowGray}
                alt="right"
                aria-hidden="true"
                onClick={() => {
                  navigate(MY_ACCOUNT_PATH.PETINFO);
                }}
              />
            </div>
            <div className="my-account-page-header-my-pet-profile-address">서울시 송파구</div>
            <div className="my-account-page-header-my-pet-profile-date">기록시작 2020.10.11</div>
          </div>
        </body>
      </header>
      <body className="my-account-page-body" style={neighborRankingPageBodyStyle}>
        <div className="my-account-page-body-item">
          내정보 관리
          <img src={RightArrow} alt="more" />
        </div>
        <div className="my-account-page-body-item" aria-hidden="true" onClick={() => { navigate(MY_ACCOUNT_PATH.SETTINGS) }}>
          설정
          <img src={RightArrow} alt="more" />
        </div>
        <div className="my-account-page-body-item">
          <div className="my-account-page-body-item-wrapper">
            <div className="my-account-page-body-item-wrapper-title">문의</div>
            <div className="my-account-page-body-item-wrapper-sub">카카오 플러스친구로 이동</div>
          </div>
          <img src={RightArrow} alt="more" />
        </div>
        <div
          className="my-account-page-body-item"
          aria-hidden="true"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          로그아웃
          <img src={RightArrow} alt="more" />
        </div>
      </body>
      {modalOpen && <AlertConfirm
        text="로그아웃 하시겠습니까?"
        buttonText="로그아웃"
        yesButtonHandler={logoutHandler}
        noButtonHandler={() => {
          setModalOpen(false);
        }}
      />}
      <FooterNavigation />
    </div>
  );
}

export default MyAccountPage;
