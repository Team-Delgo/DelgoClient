/* eslint-disable array-callback-return */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';
import { getMungPlaceList } from '../../../common/api/certification';
import { GET_MUNG_PLACE_LIST, CACHE_TIME, STALE_TIME } from '../../../common/constants/queryKey.const';
import MagnifyingGlass from '../../../common/icons/magnifying-glass.svg';
import Bath from '../../../common/icons/bath.svg';
import Beauty from '../../../common/icons/beauty.svg';
import Cafe from '../../../common/icons/cafe.svg';
import Hospital from '../../../common/icons/hospital.svg';
import Restorant from '../../../common/icons/restorant.svg';
import Walk from '../../../common/icons/walk.svg';
import Etc from '../../../common/icons/etc.svg';
import Check from '../../../common/icons/place-check.svg';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';

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

interface MungPlaceType {
  categoryCode: string;
  geoCode: string;
  jibunAddress: string;
  latitude: string;
  longitude: string;
  mungpleId: number;
  p_geoCode: string;
  placeName: string;
  registDt: string;
  roadAddress: string;
}

const categoryCode: categoryType = {
  산책: 'CA0001',
  카페: 'CA0002',
  식당: 'CA0003',
  목욕: 'CA0004',
  미용: 'CA0005',
  병원: 'CA0006',
  기타: 'CA9999',
};

const categoryIcon: categoryType = {
  산책: Walk,
  카페: Cafe,
  식당: Restorant,
  목욕: Bath,
  미용: Beauty,
  병원: Hospital,
  기타: Etc,
};

const sheetStyle = { borderRadius: '18px 18px 0px 0px' };
const sheetSnapPoints = [
  window.innerHeight - window.innerWidth+10,
  window.innerHeight - window.innerWidth+10,
  window.innerHeight - window.innerWidth+10,
  window.innerHeight - window.innerWidth+10,
];

function CaptureLocationRecord() {
  const [placeName, setPlaceName] = useState('');
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
  const [checkedPlaceId, setCheckedPlaceId] = useState(-1);
  const [manualChecked, setManualChecked] = useState(false);
  const ref = useRef<SheetRef>();
  const inputRef = useRef<any>();
  const { categoryKo } = useSelector((state: RootState) => state.persist.upload);
  const { width, height } = useSelector((state: RootState) => state.persist.device);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('width',width)
  console.log('height',height)

  const { isLoading: getMungPlaceListIsLoading, data: mungPlaceList } = useQuery(
    GET_MUNG_PLACE_LIST,
    () => getMungPlaceList(categoryCode[categoryKo]),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  const moveToCapturePage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  const writeTitle = useCallback((e) => {
    setPlaceName(e.target.value.trim());
  }, []);

  const selectMongPlace = (place: MungPlaceType) => (event: React.MouseEvent) => {
    const { mungpleId, placeName } = place;
    setCheckedPlaceId(mungpleId);
    dispatch(uploadAction.setMongPlace({ mungpleId, placeName }));
    setTimeout(() => {
      navigate(CAMERA_PATH.CERTIFICATION);
    }, 1000);
  };

  const selectManualPlace = () => {
    setManualChecked(true);
    dispatch(uploadAction.setMongPlace({ mungpleId: 0, placeName }));
    setTimeout(() => {
      navigate(CAMERA_PATH.CERTIFICATION);
    }, 500);
  };

  const manualPlace = () => {
    return (
      <div className="review-place-wrapper" aria-hidden="true" onClick={selectManualPlace}>
        <div>
          <div className={manualChecked === true ? 'review-place-wrapper-active-name' : 'review-place-wrapper-name'}>
            {placeName}
          </div>
          <div
            className={manualChecked === true ? 'review-place-wrapper-active-address' : 'review-place-wrapper-address'}
          >
            장소 직접추가
          </div>
        </div>
        {manualChecked === true ? <img className="review-place-check" src={Check} alt="category-img" /> : null}
      </div>
    );
  };

  return (
    <Sheet
      isOpen
      onClose={closeBottomSheet}
      snapPoints={[
        height - width + 10,
        height - width + 10,
        height - width + 10,
        height - width+ 10,
      ]}
      // ref={ref}
      disableDrag
      className="modal-bottom-sheet"
    >
      <Sheet.Container style={sheetStyle}>
        <Sheet.Content>
          <main className="capture-img-record">
            <header className="capture-img-record-container">
              <img src={categoryIcon[categoryKo]} alt="category-img" />
              <div className="capture-img-record-category">
                <div className="capture-img-record-category-label">{categoryKo}</div>
                <div className="capture-img-record-category-rechoice" aria-hidden="true" onClick={moveToCapturePage}>
                  다시선택
                </div>
              </div>
            </header>
            <body className="review-container">
              <input
                type="text"
                ref={inputRef}
                className="review-place-name"
                placeholder="여기는 어디인가요?"
                onChange={writeTitle}
              />
              <img className="magnifying-glass-img" src={MagnifyingGlass} alt="magnifying-glass-img" />
              {mungPlaceList?.data.map((place: MungPlaceType) => {
                if (placeName.length > 0) {
                  if (place.placeName.includes(placeName)) {
                    return (
                      <div className="review-place-wrapper" aria-hidden="true" onClick={selectMongPlace(place)}>
                        <div>
                          <div
                            className={
                              checkedPlaceId === place.mungpleId
                                ? 'review-place-wrapper-active-name'
                                : 'review-place-wrapper-name'
                            }
                          >
                            {place.placeName}
                          </div>
                          <div
                            className={
                              checkedPlaceId === place.mungpleId
                                ? 'review-place-wrapper-active-address'
                                : 'review-place-wrapper-address'
                            }
                          >
                            {place.roadAddress}
                          </div>
                        </div>
                        {checkedPlaceId === place.mungpleId ? (
                          <img className="review-place-check" src={Check} alt="category-img" />
                        ) : null}
                      </div>
                    );
                  }
                }
              })}
              {placeName.length > 0 && manualPlace()}
            </body>
          </main>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}

export default CaptureLocationRecord;
