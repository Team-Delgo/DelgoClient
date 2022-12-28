import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { Cert } from '../../common/types/map';
import './RecordCertification.scss';
import { certificationLike, deleteCertificationPost } from '../../common/api/certification';
import { uploadAction } from '../../redux/slice/uploadSlice';
import { CAMERA_PATH, RECORD_PATH } from '../../common/constants/path.const';
import { RootState } from '../../redux/store';
import DeleteBottomSheet from '../../common/dialog/ConfirmBottomSheet';
import { categoryCode2 } from '../../common/types/category';


function RecordCertification(props: { certification: Cert }) {
  const { certification } = props;
  const dispatch = useDispatch();
  const [selfHeart, setSelfHeart] = useState(certification.isLike);
  const [count, setCount] = useState(certification.likeCount);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [likeIsLoading, setLikeIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.persist.user);

  const handleCertificationLike = () => {
    setSelfHeart(!selfHeart);
    setCount(selfHeart ? count - 1 : count + 1);
    certificationLike(
      certification.userId,
      certification.certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          console.log('좋아요 성공ㅋ')
        }
      },
      dispatch,
    );
  };

  const deleteCertification = useCallback(() => {
    closeBottomSheet();
    deleteCertificationPost(
      user.id,
      certification?.certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        console.log(response);
        if (code === 200) {
          moveToPhotoPage();
        }
      },
      dispatch,
    );
  },[])

  const moveToPhotoPage = useCallback(() => {
    navigate(RECORD_PATH.PHOTO);
  },[])

  const moveToUpdatePage = useCallback(() => {
    dispatch(
      uploadAction.setCertificationUpdate({
        img: certification?.photoUrl,
        categoryKo: categoryCode2[certification?.categoryCode],
        title: certification?.placeName,
        certificationId: certification?.certificationId,
        content: certification?.description,
      }),
    );
    navigate(CAMERA_PATH.UPDATE, {
      state: {
        prevPath: RECORD_PATH.PHOTO,
      },
    });
  },[])

  const openBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(true);
  },[])

  const closeBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(false);
  },[])

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
            onClick={handleCertificationLike}
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
          {certification.commentCount > 0 && <div className="record-cert-icons-count">{certification.commentCount}</div>}
        </div>
      </div>
      <DeleteBottomSheet
        text="기록을 삭제하실건가요?"
        description="지우면 다시 볼 수 없어요"
        cancelText="취소"
        acceptText="삭제"
        acceptButtonHandler={deleteCertification}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />
    </>
  );
}

export default RecordCertification;
