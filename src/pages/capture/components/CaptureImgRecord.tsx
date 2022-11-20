import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { uploadAction } from '../../../redux/slice/uploadSlice';
import Bath from '../../../common/icons/bath.svg';
import Beauty from '../../../common/icons/beauty.svg';
import Cafe from '../../../common/icons/cafe.svg';
import Hospital from '../../../common/icons/hospital.svg';
import Restorant from '../../../common/icons/restorant.svg';
import Walk from '../../../common/icons/walk.svg';
import Etc from '../../../common/icons/etc.svg';
import { CACHE_TIME, GET_CERTIFICATION_DATA_COUNT, STALE_TIME } from '../../../common/constants/queryKey.const';
import { getCertificationDataCount } from '../../../common/api/certification';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { RootState } from '../../../redux/store';


const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [-window.innerWidth + 20, 0, 0, 0];

// [window.innerHeight - window.innerWidth + 5, 0, 0, 0];

function CaptureImgRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCateogory, setSelectedCateogory] = useState('');
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.persist.user);
  const categoryRef = useRef<any>();

  const { isLoading: getCertificationDataCountIsLoading, data: certificationDataCount } = useQuery(
    GET_CERTIFICATION_DATA_COUNT,
    () => getCertificationDataCount(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    setTimeout(() => {
      setBottomSheetIsOpen(true);
    }, 1000);
  }, [bottomSheetIsOpen]);

  const moveToCategoryPage = (category: string) => (e: React.MouseEvent) => {
    console.log(1);
    dispatch(uploadAction.setCategory({ category }));
    navigate(CAMERA_PATH.LOCATION);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  const moveToCategoryLeftScroll = (category: string) => (e: React.MouseEvent) => {
    setSelectedCateogory(category);
    console.log(selectedCateogory);
    categoryRef.current.scrollTo({
      left: categoryRef.current.scrollLeft - categoryRef.current.offsetWidth,
      behavior: 'smooth',
    });
    setTimeout(() => {
      dispatch(uploadAction.setCategory({ category }));
      navigate(CAMERA_PATH.LOCATION);
    }, 800);
  };

  const moveToCategoryCenterScroll = (category: string) => (e: React.MouseEvent) => {
    setSelectedCateogory(category);
    categoryRef.current.scrollTo({
      left: categoryRef.current.offsetWidth / 2,
      behavior: 'smooth',
    });
    setTimeout(() => {
      dispatch(uploadAction.setCategory({ category }));
      navigate(CAMERA_PATH.LOCATION);
    }, 800);
  };

  const moveToCategoryRightScroll = (category: string) => (e: React.MouseEvent) => {
    setSelectedCateogory(category);
    console.log(category);
    categoryRef.current.scrollTo({
      left: categoryRef.current.offsetWidth,
      behavior: 'smooth',
    });
    setTimeout(() => {
      dispatch(uploadAction.setCategory({ category }));
      navigate(CAMERA_PATH.LOCATION);
    }, 800);
  };

  return (
    <div className="capture-img-record">
      <header className="capture-img-record-header">어떤 기록인가요?</header>
      <body className="capture-img-record-body" ref={categoryRef}>
        <div className="capture-img-record-body-walk" aria-hidden="true" onClick={moveToCategoryLeftScroll('산책')}>
          <img
            src={Walk}
            alt="category-img"
            className={
              selectedCateogory === '산책'
                ? 'capture-img-record-body-walk-img-active'
                : 'capture-img-record-body-walk-img'
            }
          />
          <div className="capture-img-record-body-walk-count">{certificationDataCount?.data.산책}</div>
        </div>
        <div className="capture-img-record-body-cafe" aria-hidden="true" onClick={moveToCategoryLeftScroll('카페')}>
          <img
            src={Cafe}
            alt="category-img"
            className={
              selectedCateogory === '카페'
                ? 'capture-img-record-body-cafe-img-active'
                : 'capture-img-record-body-cafe-img'
            }
          />
          <div className="capture-img-record-body-cafe-count">{certificationDataCount?.data.카페}</div>
        </div>
        <div
          className="capture-img-record-body-restaurant"
          aria-hidden="true"
          onClick={moveToCategoryLeftScroll('식당')}
        >
          <img
            src={Restorant}
            alt="category-img"
            className={
              selectedCateogory === '식당'
                ? 'capture-img-record-body-restaurant-img-active'
                : 'capture-img-record-body-restaurant-img'
            }
          />
          <div className="capture-img-record-body-restaurant-count">{certificationDataCount?.data.식당}</div>
        </div>
        <div className="capture-img-record-body-bath" aria-hidden="true" onClick={moveToCategoryLeftScroll('목욕')}>
          <img
            src={Bath}
            alt="category-img"
            className={
              selectedCateogory === '목욕'
                ? 'capture-img-record-body-bath-img-active'
                : 'capture-img-record-body-bath-img'
            }
          />
          <div className="capture-img-record-body-bath-count">{certificationDataCount?.data.목욕}</div>
        </div>
        <div className="capture-img-record-body-beauty" aria-hidden="true" onClick={moveToCategoryRightScroll('미용')}>
          <img
            src={Beauty}
            alt="category-img"
            className={
              selectedCateogory === '미용'
                ? 'capture-img-record-body-beauty-img-active'
                : 'capture-img-record-body-beauty-img'
            }
          />
          <div className="capture-img-record-body-beauty-count">{certificationDataCount?.data.미용}</div>
        </div>
        <div
          className="capture-img-record-body-hospital"
          aria-hidden="true"
          onClick={moveToCategoryRightScroll('병원')}
        >
          <img
            src={Hospital}
            alt="category-img"
            className={
              selectedCateogory === '병원'
                ? 'capture-img-record-body-hospital-img-active'
                : 'capture-img-record-body-hospital-img'
            }
          />
          <div className="capture-img-record-body-hospital-count">{certificationDataCount?.data.병원}</div>
        </div>
        <div className="capture-img-record-body-etc" aria-hidden="true" onClick={moveToCategoryRightScroll('기타')}>
          <img
            src={Etc}
            alt="category-img"
            className={
              selectedCateogory === '기타'
                ? 'capture-img-record-body-etc-img-active'
                : 'capture-img-record-body-etc-img'
            }
          />
          <div className="capture-img-record-body-etc-count">{certificationDataCount?.data.기타}</div>
        </div>
      </body>
    </div>
  );
}

export default CaptureImgRecord;
