import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Certification } from './RecordCertificationPage';
import VerticalDevider from '../../common/icons/vertical-devide.svg';
import Cafe from '../../common/icons/cafe.svg';
import Walk from '../../common/icons/walk.svg';
import Hair from '../../common/icons/beauty.svg';
import Hospital from '../../common/icons/hospital.svg';
import Bath from '../../common/icons/bath.svg';
import Eat from '../../common/icons/eat.svg';
import Heart from '../../common/icons/heart-empty.svg';
import FillHeart from '../../common/icons/heart.svg';
import Comments from '../../common/icons/comments.svg';
import { Cert } from '../map/MapType';
import './RecordCertification.scss';
import { CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const';
import { certificationLike, deleteCertificationPost } from '../../common/api/certification';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import { uploadAction } from '../../redux/slice/uploadSlice';
import { CAMERA_PATH, RECORD_PATH } from '../../common/constants/path.const';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import { RootState } from '../../redux/store';
import DeleteBottomSheet from '../../common/utils/ConfirmBottomSheet';

interface categoryType {
  CA0001: string;
  CA0002: string;
  CA0003: string;
  CA0004: string;
  CA0005: string;
  CA0006: string;
  CA9999: string;
  [prop: string]: any;
}

const categoryCode: categoryType = {
  CA0001: '산책',
  CA0002: '카페',
  CA0003: '식당',
  CA0004: '목욕',
  CA0005: '미용',
  CA0006: '병원',
  CA9999: '기타',
};

function RecordCertification(props: { certification: Cert }) {
  const { certification } = props;
  const dispatch = useDispatch();
  const [selfHeart, setSelfHeart] = useState(certification.isLike);
  const [count, setCount] = useState(certification.likeCount);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [likeIsLoading,setLikeIsLoading] = useState(false)
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.persist.user);

  const handleCertificationLike = () => {
    if (likeIsLoading) return;
    setLikeIsLoading(true);
    certificationLike(
      certification.userId,
      certification.certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setSelfHeart(!selfHeart);
          setCount(selfHeart ? count - 1 : count + 1);
        }
      },
      dispatch,
    );
    setLikeIsLoading(false);
  };

  const deleteCertification = () => {
    closeBottomSheet();
    deleteCertificationPost(
      user.id,
      certification?.certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        console.log(response);
        if (code === 200) {
          moveToPhotoPage()
        }
      },
      dispatch,
    );
  };


  const moveToPhotoPage = () => {
    navigate(RECORD_PATH.PHOTO);
  };

  const moveToUpdatePage = () => {
    dispatch(
      uploadAction.setCertificationUpdate({
        img: certification?.photoUrl,
        categoryKo: categoryCode[certification?.categoryCode],
        title: certification?.placeName,
        certificationId: certification?.certificationId,
        content: certification?.description,
      }),
    );
    navigate(CAMERA_PATH.UPDATE);
  };

  const openBottomSheet = () => {
    setBottomSheetIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };


  let icon;
  if (certification.categoryCode === 'CA0001') icon = Walk;
  else if (certification.categoryCode === 'CA0002') icon = Cafe;
  else if (certification.categoryCode === 'CA0003') icon = Eat;
  else if (certification.categoryCode === 'CA0004') icon = Bath;
  else if (certification.categoryCode === 'CA0005') icon = Hair;
  else if (certification.categoryCode === 'CA0006') icon = Hospital;
  else icon = Walk;
  return (
    <>
      <div className="record-cert">
        <div className="record-cert-edit">
          <div aria-hidden="true" onClick={moveToUpdatePage}>
            수정
          </div>
          <img src={VerticalDevider} alt="devider" />
          <div aria-hidden="true" onClick={openBottomSheet}>
            삭제
          </div>
        </div>
        <img className="record-cert-img" src={certification.photoUrl} alt={certification.placeName} />
        <div className="record-cert-main">
          <div className="record-cert-main-text">
            <div className="record-cert-main-text-title">{certification.placeName}</div>
            <div className="record-cert-main-text-sub">{certification.address}</div>
          </div>
          <img src={icon} alt="icon" />
        </div>
        <div className="record-cert-devider" />
        <div className="record-cert-description">{certification.description}</div>
        <div className="record-cert-icons">
          <img
            className="record-cert-icons-heart"
            src={selfHeart ? FillHeart : Heart}
            alt="heart"
            aria-hidden="true"
            onClick={() => {
              handleCertificationLike();
            }}
          />
          {count > 0 && <div className="record-cert-icons-count">{count}</div>}
          <img
            className="record-cert-icons-comments"
            src={Comments}
            alt="comments"
            aria-hidden="true"
            onClick={() => {
              navigate(`/comments/${certification.certificationId}`, {
                state: { certificationId: certification?.certificationId, posterId: certification?.userId },
              });
            }}
          />
          {certification.commentCount > 0 && (
            <div className="record-cert-icons-count">{certification.commentCount}</div>
          )}
        </div>
      </div>
      <DeleteBottomSheet
        text="기록을 삭제하실건가요?"
        description='지우면 다시 볼 수 없어요'
        cancelText='취소'
        acceptText='삭제'
        acceptButtonHandler={deleteCertification}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />
      
    </>
  );
}

export default RecordCertification;
