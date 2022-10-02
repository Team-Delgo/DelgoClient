import React, { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BottomButton from '../../../common/components/BottomButton';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { registerCertificationPost } from '../../../common/api/certification';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';

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

function CaptureCategoryRecord() {
  const [placeName, setPlaceName] = useState('');
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificationCompleteAlert, setCertificationCompleteAlert] = useState(false);
  const [certificationPostContentLengthLimitAlert, setCertificationPostContentLengthLimitAlert] = useState(false);
  const { categoryKo, img, latitude, longitude,mongPlaceId } = useSelector((state: RootState) => state.persist.upload);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToPreviousPage = () => {
    navigate(CAMERA_PATH.LOCATION);
  };

  const writeTitle = useCallback((e) => {
    setPlaceName(e.target.value);
  }, []);

  const writeContent = useCallback((e) => {
    setCertificationPostContent(e.target.value);
  }, []);

  const uploadCertificationPost = () => {
    registerCertificationPost(
      {
        userId: 1,
        categoryCode: categoryCode[categoryKo],
        mungpleId: mongPlaceId,
        placeName,
        description: certificationPostContent,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        photo: img,
      },
      (response: AxiosResponse) => {
        const { code, codeMsg, data } = response.data;
        if (code === 200) {
          dispatch(
            uploadAction.setTitleContentRegistDt({
              title: placeName,
              content: certificationPostContent,
              registDt: data.registDt,
            }),
          );
          navigate(CAMERA_PATH.RESULT);
        }
        else{
          window.alert(codeMsg)
        }
      },
    );
  };

  return (
    <>
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
            className="review-place-name"
            placeholder="여기는 어디인가요? (ex: 델고커피)"
            onChange={writeTitle}
          />
          <textarea
            className="review-content"
            placeholder="남기고 싶은 기록을 작성해주세요"
            onChange={writeContent}
            maxLength={200}
          />
          <div className="review-content-length">{certificationPostContent.length}/200</div>
        </body>
      </main>
      <footer aria-hidden="true" onClick={uploadCertificationPost}>
        <BottomButton text="작성 완료" />
      </footer>
    </>
  );
}

export default CaptureCategoryRecord;
