import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import Sheet, { SheetRef } from 'react-modal-sheet';
import BottomButton from '../../../common/components/BottomButton';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';
import { getMungPlaceList } from '../../../common/api/certification';
import { GET_MUNG_PLACE_LIST, CACHE_TIME, STALE_TIME } from '../../../common/constants/queryKey.const';
import MagnifyingGlass from '../../../common/icons/magnifying-glass.svg';

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

const categoryEnglish: categoryType = {
  산책: 'walk',
  카페: 'cafe',
  식당: 'restaurant',
  목욕: 'hospital',
  미용: 'beauty',
  병원: 'bath',
  기타: 'etc',
};

const sheetStyle = { borderRadius: '18px 18px 0px 0px'};
const sheetSnapPoints = [window.innerHeight - window.innerWidth + 10, window.innerHeight - 150, 0, 0];

function CaptureLocationRecord() {
  const [placeName, setPlaceName] = useState('');
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificationCompleteAlert, setCertificationCompleteAlert] = useState(false);
  const [certificationPostContentLengthLimitAlert, setCertificationPostContentLengthLimitAlert] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(true);
  const ref = useRef<SheetRef>();
  const inputRef = useRef<any>();
  const categoryKo = useSelector((state: RootState) => state.persist.upload.categoryKo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: getMungPlaceListIsLoading, data: mungPlaceList } = useQuery(
    GET_MUNG_PLACE_LIST,
    () => getMungPlaceList(categoryCode[categoryKo]),
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

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  const moveToPreviousPage = () => {
    navigate(CAMERA_PATH.CAPTURE);
  };

  const writeTitle = useCallback((e) => {
    setPlaceName(e.target.value);
  }, []);

  const moveToCategoryPage = () => {
    navigate(CAMERA_PATH.CATEGORY);
  };

  const selectMongPlace = (mongPlaceId: number) => (event: React.MouseEvent) => {
    dispatch(uploadAction.setMongPlace({ mongPlaceId }));
    navigate(CAMERA_PATH.CATEGORY);
  };

  const onFocus = () => snapTo(1);

  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <Sheet
      isOpen={bottomSheetIsOpen}
      onClose={closeBottomSheet}
      snapPoints={sheetSnapPoints}
      ref={ref}
      className="modal-bottom-sheet"
    >
      <Sheet.Container style={sheetStyle}>
        <Sheet.Content>
          <main className="capture-img-record">
            <header className="capture-img-record-container">
              <div
                className={`capture-img-record-body-${categoryEnglish[categoryKo]}`}
                aria-hidden="true"
                onClick={moveToPreviousPage}
              >
                <div className={`capture-img-record-body-${categoryEnglish[categoryKo]}-label`}>{categoryKo}</div>
                <div className={`capture-img-record-body-${categoryEnglish[categoryKo]}-count`}>다시선택</div>
              </div>
            </header>
            <body className="review-container">
              <input
                type="text"
                ref={inputRef}
                className="review-place-name"
                placeholder="여기는 어디인가요? (ex: 델고커피)"
                onChange={writeTitle}
              />
              <img className="magnifying-glass-img" src={MagnifyingGlass} alt="magnifying-glass-img" />
              {mungPlaceList?.data.map((place: MungPlaceType) => (
                <div className="review-place-wrapper" aria-hidden="true" onClick={selectMongPlace(place.mungpleId)}>
                  <div className="review-place-wrapper-name">{place.placeName}</div>
                  <div className="review-place-wrapper-address">{place.roadAddress}</div>
                </div>
              ))}
            </body>
          </main>
          <footer aria-hidden="true" onClick={moveToCategoryPage}>
            <BottomButton text="다음" color="#C4C4C4" />
          </footer>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}

export default CaptureLocationRecord;
