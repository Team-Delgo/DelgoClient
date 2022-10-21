import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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


const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [-window.innerWidth + 20, 0, 0, 0];

// [window.innerHeight - window.innerWidth + 5, 0, 0, 0];

function CaptureImgRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);


  const { isLoading: getCertificationDataCountIsLoading, data: certificationDataCount } = useQuery(
    GET_CERTIFICATION_DATA_COUNT,
    () => getCertificationDataCount(1),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      //   onError: (error: any) => {
      //     useErrorHandlers(dispatch, error);
      //   },
    },
  );

  useEffect(() => {
    setTimeout(() => {
      setBottomSheetIsOpen(true);
    }, 1000);
  }, [bottomSheetIsOpen]);

  const moveToCategoryPage = (category: string) => (e: React.MouseEvent) => {
    dispatch(uploadAction.setCategory({ category }));
    navigate(CAMERA_PATH.LOCATION);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  // snapPoints={sheetSnapPoints}
  return (
    <div className="capture-img-record">
      <header className="capture-img-record-header">어떤 기록인가요?</header>
      <body className="capture-img-record-body">
        <div className="capture-img-record-body-walk" aria-hidden="true" onClick={moveToCategoryPage('산책')}>
          <img src={Walk} alt="category-img" />
          <div className="capture-img-record-body-walk-count">{certificationDataCount?.data.산책}</div>
        </div>
        <div className="capture-img-record-body-cafe" aria-hidden="true" onClick={moveToCategoryPage('카페')}>
          <img src={Cafe} alt="category-img" />
          <div className="capture-img-record-body-cafe-count">{certificationDataCount?.data.카페}</div>
        </div>
        <div className="capture-img-record-body-restaurant" aria-hidden="true" onClick={moveToCategoryPage('식당')}>
          <img src={Restorant} alt="category-img" />
          <div className="capture-img-record-body-restaurant-count">{certificationDataCount?.data.식당}</div>
        </div>
        <div className="capture-img-record-body-bath" aria-hidden="true" onClick={moveToCategoryPage('목욕')}>
          <img src={Bath} alt="category-img" />
          <div className="capture-img-record-body-bath-count">{certificationDataCount?.data.목욕}</div>
        </div>
        <div className="capture-img-record-body-beauty" aria-hidden="true" onClick={moveToCategoryPage('미용')}>
          <img src={Beauty} alt="category-img" />
          <div className="capture-img-record-body-beauty-count">{certificationDataCount?.data.미용}</div>
        </div>
        <div className="capture-img-record-body-hospital" aria-hidden="true" onClick={moveToCategoryPage('병원')}>
          <img src={Hospital} alt="category-img" />
          <div className="capture-img-record-body-hospital-count">{certificationDataCount?.data.병원}</div>
        </div>
        <div className="capture-img-record-body-etc" aria-hidden="true" onClick={moveToCategoryPage('기타')}>
          <img src={Etc} alt="category-img" />
          <div className="capture-img-record-body-etc-count">{certificationDataCount?.data.기타}</div>
        </div>
      </body>
    </div>
  );
}

export default CaptureImgRecord;
