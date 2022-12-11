import React, { ChangeEvent, TouchEventHandler, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { useLocation, useNavigate } from 'react-router-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { Ring } from 'react-css-spinners';
import '../../common/utils/Loading.scss';
import FooterNavigation from '../../common/components/FooterNavigation';
import RecordHeader from '../../common/components/RecordHeader';
import './Photo.scss';
import Cafe from '../../common/icons/cafe.svg';
import Walk from '../../common/icons/walk.svg';
import Hair from '../../common/icons/beauty.svg';
import Hospital from '../../common/icons/hospital.svg';
import Bath from '../../common/icons/bath.svg';
import Eat from '../../common/icons/eat.svg';
import Else from '../../common/icons/else.svg';
import UnderArrow from '../../common/icons/under-arrow-gray.svg';
import { Cert } from '../map/MapType';
import { getCategoryCount, getPhotoData } from '../../common/api/record';
import Devider from '../../common/icons/vertical-devide.svg';
import { RECORD_PATH } from '../../common/constants/path.const';
import Loading from '../../common/utils/Loading';
import {analytics} from "../../index";

const categoryCode: categoryType = {
  산책: 'CA0001',
  카페: 'CA0002',
  식당: 'CA0003',
  목욕: 'CA0004',
  미용: 'CA0005',
  병원: 'CA0006',
  기타: 'CA9999',
};

interface categoryType {
  산책: string;
  카페: string;
  식당: string;
  목욕: string;
  미용: string;
  병원: string;
  기타: string;
  [prop: string]: any;
}

const rightScrollCategory = ['목욕', '미용', '병원', '기타'];

function Photo() {
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const ref = useOnclickOutside(() => {
    setButtonIsClicked(false);
  });
  const [photos, setPhotos] = useState<Cert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [page, setPage] = useState<number>(0);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [categoryCount, setCategoryCount] = useState({ 산책: 0, 카페: 0, 식당: 0, 미용: 0, 병원: 0, 기타: 0, 목욕: 0 });
  const [categoryTab, setCategoryTab] = useState('전체');
  const [sortOption, setSortOption] = useState<boolean>(true);
  const [isLast, setLast] = useState(false);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const categoryRef = useRef<any>();
  const [cateogory, setCategory] = useState(
    location?.state?.category ? categoryCode[location?.state?.category] : 'CA0000',
  );

  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: "Album",
        firebase_screen_class: "AlbumPage"
      }
    });
    getCategoryCountList();
    if (location?.state?.from === 'home') {
      console.log('location.state', location.state);
      setCategoryTab(location.state.category);
      setCategory(categoryCode[location.state.category]);
      if (rightScrollCategory.includes(location.state.category)) {
        moveToCategoryRightScroll();
      }
    }
    if (location?.state?.from !== 'home') {
      getPhotoDataList();
    }
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const touchStartFunc = (e: any) => {
    setTouchStart(e.touches[0].clientX);
    console.log(e.touches[0].clientX);
  };

  const touchEndFunc = (e: any) => {
    setTouchEnd(e.changedTouches[0].clientX);
    console.log(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (touchStart - touchEnd > 200) {
      navigate(RECORD_PATH.CALENDAR, { state: 'calendar' });
    }
  }, [touchEnd]);

  useEffect(() => {
    if (isFetching && !isLast) getPhotoDataList();
    else if (isLast) setFetching(true);
  }, [isFetching]);

  const changePhotoData = async () => {
    await getPhotoData(
      userId,
      cateogory,
      0,
      6,
      sortOption,
      (response: AxiosResponse) => {
        const { data } = response;
        console.log(response);
        setPage(1);
        setPhotos(data.data.content);
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
  };

  useEffect(() => {
    console.log(cateogory);
    changePhotoData();
  }, [cateogory, sortOption]);

  const moveToCategoryLeftScroll = () => {
    categoryRef.current.scrollTo({
      left: categoryRef.current.scrollLeft - categoryRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const moveToCategoryRightScroll = () => {
    categoryRef.current.scrollTo({
      left: categoryRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const getPhotoDataList = async () => {
    setIsLoading(true);
    await getPhotoData(
      userId,
      cateogory,
      page,
      6,
      sortOption,
      (response: AxiosResponse) => {
        const { data } = response;
        console.log(response);
        setPage(page + 1);
        setPhotos(photos.concat(data.data.content));
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
    setIsLoading(false);
  };

  const photoContext = photos.map((photo) => {
    return (
      <img
        src={photo.photoUrl}
        alt="cert"
        aria-hidden="true"
        onClick={() => {
          navigate('/certs', { state: { certifications: [photo], pageFrom: RECORD_PATH.PHOTO } });
        }}
      />
    );
  });
  if (photoContext.length % 2 === 0) {
    photoContext.concat(<div className="photo-fake" />);
  }

  const getCategoryCountList = async () => {
    getCategoryCount(
      userId,
      (response: AxiosResponse) => {
        const { data } = response.data;
        setCategoryCount(data);
      },
      dispatch,
    );
  };

  const optionClickHandler = (e: any) => {
    setSortOption(e.target.value);
    setButtonIsClicked(false);
  };

  return (
    <div className="photo">
      <FooterNavigation />
      <div className="photo-header">
        <RecordHeader />
      </div>

      <div className="photo-history">
        <div className="photo-history-title">{categoryTab}기록</div>
        <div className="photo-history-select">
          {cateogory !== 'CA0000' && (
            <div
              className="photo-history-select-all"
              aria-hidden="true"
              onClick={() => {
                setCategory('CA0000');
                setCategoryTab('전체');
              }}
            >
              기록전체
              <img src={Devider} alt="devider" />
            </div>
          )}
          <div
            className="photo-history-select-sort"
            aria-hidden="true"
            onClick={() => {
              setButtonIsClicked(!buttonIsClicked);
            }}
          >
            {sortOption ? '최신순' : '오래된순'}
            <img src={UnderArrow} alt="arrow" />
          </div>
        </div>
      </div>
      <div className="photo-category" ref={categoryRef}>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0001');
            setCategoryTab('산책');
            moveToCategoryLeftScroll();
          }}
        >
          <img className={classNames('CA0001', { selected: cateogory === 'CA0001' })} src={Walk} alt="walk" />
          <span>{categoryCount.산책}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0002');
            setCategoryTab('카페');
            moveToCategoryLeftScroll();
          }}
        >
          <img className={classNames('CA0002', { selected: cateogory === 'CA0002' })} src={Cafe} alt="cafe" />
          <span>{categoryCount.카페}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0003');
            setCategoryTab('식당');
            moveToCategoryLeftScroll();
          }}
        >
          <img className={classNames('CA0003', { selected: cateogory === 'CA0003' })} src={Eat} alt="hair" />
          <span>{categoryCount.식당}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0004');
            setCategoryTab('목욕');
            moveToCategoryRightScroll();
          }}
        >
          <img className={classNames('CA0004', { selected: cateogory === 'CA0004' })} src={Bath} alt="bath" />
          <span>{categoryCount.목욕}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0005');
            setCategoryTab('미용');
            moveToCategoryRightScroll();
          }}
        >
          <img className={classNames('CA0005', { selected: cateogory === 'CA0005' })} src={Hair} alt="beauty" />
          <span>{categoryCount.미용}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA0006');
            setCategoryTab('병원');
            moveToCategoryRightScroll();
          }}
        >
          <img className={classNames('CA0006', { selected: cateogory === 'CA0006' })} src={Hospital} alt="eat" />
          <span>{categoryCount.병원}회</span>
        </div>
        <div
          aria-hidden="true"
          className="photo-category-button item"
          onClick={() => {
            setCategory('CA9999');
            setCategoryTab('기타');
            moveToCategoryRightScroll();
          }}
        >
          <img className={classNames('CA9999', { selected: cateogory === 'CA9999' })} src={Else} alt="else" />
          <span>{categoryCount.기타}회</span>
        </div>
      </div>

      <div className="photo-wrapper" onTouchStart={touchStartFunc} onTouchEnd={touchEndFunc}>
        {isLoading && (
          <div className="loader photo">
            <Ring color="#aa98ec" size={60} />
          </div>
        )}
        {photoContext}
      </div>
      <Sheet
        className="confirm-bottom-sheet-container"
        isOpen={buttonIsClicked}
        disableDrag
        onClose={() => {
          setButtonIsClicked(false);
        }}
        snapPoints={[160, 160, 160, 160]}
      >
        <Sheet.Container>
          {/* <Sheet.Header /> */}
          <Sheet.Content>
            <div className="photo-sort-option" ref={ref}>
              <div
                className={classNames('photo-sort-option-item', { selected: sortOption })}
                aria-hidden="true"
                onClick={() => {
                  setSortOption(true);
                  setButtonIsClicked(false);
                }}
              >
                최신순
              </div>
              <div className="photo-sort-option-devider" />
              <div
                className={classNames('photo-sort-option-item', { selected: !sortOption })}
                aria-hidden="true"
                onClick={() => {
                  setSortOption(false);
                  setButtonIsClicked(false);
                }}
              >
                오래된순
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default Photo;
