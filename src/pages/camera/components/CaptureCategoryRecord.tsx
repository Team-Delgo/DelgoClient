import React, { useState, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BottomButton from '../../../common/components/BottomButton';
import { CAMERA_PATH } from '../../../common/constants/path.const';
import { registerCertificationPost } from '../../../common/api/certification';
import { RootState } from '../../../redux/store';
import { uploadAction } from '../../../redux/slice/uploadSlice';

function CaptureCategoryRecord() {
  const [category, setCategory] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [certificationPostContent, setCertificationPostContent] = useState('');
  const [certificationCompleteAlert, setCertificationCompleteAlert] = useState(false);
  const [certificationPostContentLengthLimitAlert, setCertificationPostContentLengthLimitAlert] = useState(false);
  const { categoryKo, img, latitude, longitude } = useSelector((state: RootState) => state.persist.upload);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryKo === '산책') {
      setCategory('walk');
    } else if (categoryKo === '카페') {
      setCategory('cafe');
    } else if (categoryKo === '식당') {
      setCategory('restaurant');
    } else if (categoryKo === '병원') {
      setCategory('hospital');
    } else if (categoryKo === '미용') {
      setCategory('beauty');
    } else if (categoryKo === '목욕') {
      setCategory('bath');
    } else {
      setCategory('etc');
    }
  }, []);

  const moveToPreviousPage = () => {
    navigate(CAMERA_PATH.CAPTURE);
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
        userId: 0,
        categoryCode: 'CA0002',
        mungpleId: 0,
        placeName,
        description: certificationPostContent,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        photo: img,
      },
      (response: AxiosResponse) => {
        // const { code, codeMsg } = response.data;
        console.log(response);
        // if (code === 200) {
        //   dispatch(uploadAction.setTitleContent({ title: placeName, content: certificationPostContent }));
        //   navigate(CAMERA_PATH.RESULT);
        // }
      },
    );
  };

  return (
    <>
      <main className="capture-img-record">
        <header className="capture-img-record-container">
          <div className={`capture-img-record-body-${category}`} aria-hidden="true" onClick={moveToPreviousPage}>
            <div className={`capture-img-record-body-${category}-label`}>{categoryKo}</div>
            <div className={`capture-img-record-body-${category}-count`}>다시선택</div>
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
