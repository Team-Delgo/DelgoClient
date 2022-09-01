import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Search } from '../icons/search.svg';
import { ReactComponent as Bag } from '../icons/bag.svg';
import { ReactComponent as Person } from '../icons/person.svg';
import { ReactComponent as HomeActive } from '../icons/home-active.svg';
import { ReactComponent as SearchActive } from '../icons/search-active.svg';
import { ReactComponent as BagActive } from '../icons/bag-active.svg';
import { ReactComponent as PersonActive } from '../icons/person-active.svg';
import {
  ROOT_PATH,
  MY_STORAGE_PATH,
  MY_ACCOUNT_PATH,
  SIGN_IN_PATH,
} from '../constants/path.const';
import {RootState} from '../../redux/store'
import './FooterNavigation.scss';
import AlertConfirm from '../dialog/AlertConfirm';

function Footer() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const isSignIn = useSelector((state: RootState) => state.persist.user.isSignIn);
  const {OS} = useSelector((state:RootState)=>state.persist.device);
  const navigate = useNavigate();

  const moveToTopScreen = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  const moveToMyStoragePage = () => {
    // if (!isSignIn) {
    //   setIsModalOpen(true);
    // } else{
    //   navigate(MY_STORAGE_PATH);
    // }
  }

  const moveToMyAccountPage = () => {
    // if (!isSignIn) {
    //   setIsModalOpen(true);
    // } else {
    //   navigate(MY_ACCOUNT_PATH.MAIN);
    // }
  }

  return (
    <div className={OS === 'android' ? 'footer-android' : 'footer-ios'}>
      {isModalOpen && <AlertConfirm
        text="로그인 후 이용 할 수 있습니다."
        buttonText='로그인'
        noButtonHandler={() => {
          setIsModalOpen(false);
        }}
        yesButtonHandler={() => {
          navigate(SIGN_IN_PATH.MAIN);
        }}
      />}
      <div className='home-icon'>
        {location.pathname === ROOT_PATH ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <Link to={ROOT_PATH}>
              <HomeActive />
            </Link>
            <div className='footer-text-active'>홈</div>
          </div>
        ) : (
          <>
            <Link to={ROOT_PATH}>
              <Home />
            </Link>
            <div className='footer-text-active'>홈</div>
          </>
        )}
      </div>
      <div
        className='bag-icon'
        aria-hidden="true"
        onClick={moveToMyStoragePage}
      >
        {location.pathname === MY_STORAGE_PATH ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <BagActive />
            <div className='footer-text-active'>내 여행</div>
          </div>
        ) : (
          <>
            <Bag />
            <div className='footer-text'>내 여행</div>
          </>
        )}
      </div>
      <div
        className='person-icon'
        aria-hidden="true"
        onClick={moveToMyAccountPage}
      >
        {location.pathname === MY_ACCOUNT_PATH.MAIN ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <PersonActive />
            <div className='footer-text-active'>내 정보</div>
          </div>
        ) : (
          <>
            <Person />
            <div className='footer-text'>내 정보</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;
