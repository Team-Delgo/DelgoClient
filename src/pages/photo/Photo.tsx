import React, { useEffect, useRef, useState, lazy } from 'react';
import classNames from 'classnames';
import { useAnalyticsLogEvent, useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { useLocation, useNavigate } from 'react-router-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import Sheet from 'react-modal-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
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
import { Cert } from '../../common/types/map';
import { getCategoryCount, getPhotoData } from '../../common/api/record';
import Devider from '../../common/icons/vertical-devide.svg';
import { RECORD_PATH } from '../../common/constants/path.const';
import { analytics } from '../../index';
import { scrollActions } from '../../redux/slice/scrollSlice';
import { RootState } from '../../redux/store';
import CategoryItem, { categoryCode } from './CategoryItem';


const rightScrollCategory = ['목욕', '미용', '병원', '기타'];

function Photo() {
  const mutation = useAnalyticsLogEvent(analytics, 'screen_view');
  const navigate = useNavigate();
  const certEvent = useAnalyticsCustomLogEvent(analytics, 'album_cert');
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const { pageSize, scroll } = useSelector((state: RootState) => state.persist.scroll.photos);
  const ref = useOnclickOutside(() => {
    setButtonIsClicked(false);
  });
  const [photos, setPhotos] = useState<Cert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [page, setPage] = useState<number>(0);
  const [pageSizeFor, setPageSizeFor] = useState(pageSize);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [categoryCount, setCategoryCount] = useState({ 산책: 0, 카페: 0, 식당: 0, 미용: 0, 병원: 0, 기타: 0, 목욕: 0 });
  const [categoryTab, setCategoryTab] = useState('전체');
  const [sortOption, setSortOption] = useState<boolean>(true);
  const [isLast, setLast] = useState(false);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const categoryRef = useRef<any>();
  const [cateogory, setCategory] = useState(location?.state?.category ? categoryCode[location?.state?.category] : 'CA0000');

  useEffect(() => {
    mutation.mutate({
      params: {
        firebase_screen: 'Album',
        firebase_screen_class: 'AlbumPage',
      },
    });
    getCategoryCountList();
    if (location?.state?.from === 'home') {
      setCategoryTab(location.state.category);
      setCategory(categoryCode[location.state.category]);
      if (rightScrollCategory.includes(location.state.category)) {
        moveToCategoryRightScroll();
      }
    }
    if (location?.state?.from !== 'home' && pageSizeFor === 1) {
      getPhotoDataList();
    }
    if(pageSizeFor > 1){
      getPhotoDataList();
    }
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const touchStartFunc = (e: any) => {
    setTouchStart(e.touches[0].clientX);
  };

  const touchEndFunc = (e: any) => {
    setTouchEnd(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (touchStart - touchEnd > 200) {
      navigate(RECORD_PATH.CALENDAR, { state: 'calendar' });
    }
  }, [touchEnd]);

  useEffect(() => {
    if (isFetching && !isLast) {
      getPhotoDataList();
    }
    else if (isLast) setFetching(true);
  }, [isFetching]);

  const changePhotoData = () => {
    getPhotoData(
      userId,
      cateogory,
      0,
      6,
      sortOption,
      (response: AxiosResponse) => {
        const { data } = response;
        setPage(1);
        setPhotos(data.data.content);
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
  };

  useEffect(() => {
    changePhotoData();
  }, [cateogory, sortOption]);

  useEffect(() => {
    if (!isLoading && pageSizeFor > 1 && photos.length >= pageSizeFor*6) {
      window.scroll(0, scroll);
      setPageSizeFor(1);
    }
  }, [isLoading, photos]);

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

  const getPhotoDataList = () => {
    setIsLoading(true);
    getPhotoData(
      userId,
      cateogory,
      page,
      pageSizeFor > 1 ? 6 * pageSizeFor : 6,
      sortOption,
      (response: AxiosResponse) => {
        const { data } = response;
        if (pageSizeFor > 1) {
          setPage(pageSizeFor);
        } else {
          setPage(page + 1);
        }
        setPhotos(photos.concat(data.data.content));
        setLast(data.data.last);
        setFetching(false);
      },
      dispatch,
    );
    setIsLoading(false);
  };

  const photoContext = photos.map((photo) => {
    const photoClickHandler = () => {
      dispatch(scrollActions.photosScroll({ scroll: window.scrollY, pageSize: page }));
      certEvent.mutate();
      navigate('/certs', { state: { certifications: [photo], pageFrom: RECORD_PATH.PHOTO } });
    };

    return <img src={photo.photoUrl} alt="cert" aria-hidden="true" onClick={photoClickHandler} />;
  });
  if (photoContext.length % 2 === 0) {
    photoContext.concat(<div className="photo-fake" />);
  }

  const getCategoryCountList = () => {
    getCategoryCount(
      userId,
      (response: AxiosResponse) => {
        const { data } = response.data;
        setCategoryCount(data);
      },
      dispatch,
    );
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
        {CategoryItem('CA0001', '산책', Walk, setCategory, setCategoryTab, moveToCategoryLeftScroll, cateogory, categoryCount.산책)}
        {CategoryItem('CA0002', '카페', Cafe, setCategory, setCategoryTab, moveToCategoryLeftScroll, cateogory, categoryCount.카페)}
        {CategoryItem('CA0003', '식당', Eat, setCategory, setCategoryTab, moveToCategoryLeftScroll, cateogory, categoryCount.식당)}
        {CategoryItem('CA0004', '목욕', Bath, setCategory, setCategoryTab, moveToCategoryRightScroll, cateogory, categoryCount.목욕)}
        {CategoryItem('CA0005', '미용', Hair, setCategory, setCategoryTab, moveToCategoryRightScroll, cateogory, categoryCount.미용)}
        {CategoryItem('CA0006', '병원', Hospital, setCategory, setCategoryTab, moveToCategoryRightScroll, cateogory, categoryCount.병원)}
        {CategoryItem('CA9999', '기타', Else, setCategory, setCategoryTab, moveToCategoryRightScroll, cateogory, categoryCount.기타)}
      </div>

      <div className="photo-wrapper" onTouchStart={touchStartFunc} onTouchEnd={touchEndFunc}>
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
