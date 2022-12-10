/* eslint-disable react/no-unused-prop-types */
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { certificationLike, deleteCertificationPost } from '../../common/api/certification';
import Bath from '../icons/bath.svg';
import Beauty from '../icons/beauty.svg';
import Cafe from '../icons/cafe.svg';
import Hospital from '../icons/hospital.svg';
import Walk from '../icons/walk.svg';
import Heart from '../icons/heart-empty.svg';
import FillHeart from '../icons/heart.svg';
import Comments from '../icons/comments.svg';
import { RootState } from '../../redux/store';
import AlertConfirmOne from '../dialog/AlertConfirmOne';
import { CAMERA_PATH } from '../constants/path.const';
import { uploadAction } from '../../redux/slice/uploadSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import DeleteBottomSheet from '../utils/ConfirmBottomSheet';
import ToastSuccessMessage from '../dialog/ToastSuccessMessage';

interface userType {
  address: string;
  appleUniqueNo: null;
  email: string;
  geoCode: string;
  name: string;
  password: string;
  pgeoCode: string;
  phoneNo: string;
  profile: string;
  registDt: string;
  userId: number;
  userSocial: string;
}

interface CertificationPostProps {
  post: postType;
  refetch: () => void;
  pageSize:number;
}

interface postType {
  address: string;
  categoryCode: string;
  certificationId: number;
  commentCount: number;
  description: string;
  geoCode: string;
  isAchievements: boolean;
  isLike: boolean;
  isLive: boolean;
  isPhotoChecked: boolean;
  latitude: string;
  likeCount: number;
  longitude: string;
  mungpleId: number;
  pgeoCode: string;
  photoUrl: string;
  placeName: string;
  registDt: string;
  userId: number;
  user: userType;
}

interface weekDayType {
  Mon: string;
  Tue: string;
  Wed: string;
  Thu: string;
  Fri: string;
  Sat: string;
  Sun: string;
  [prop: string]: any;
}

const weekDay: weekDayType = {
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
  Sun: '일',
};

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

const categoryIcon: categoryType = {
  CA0001: Walk,
  CA0002: Cafe,
  CA0003: Bath,
  CA0004: Bath,
  CA0005: Beauty,
  CA0006: Hospital,
  CA9999: Hospital,
};

const categoryCode: categoryType = {
  CA0001: '산책',
  CA0002: '카페',
  CA0003: '식당',
  CA0004: '목욕',
  CA0005: '미용',
  CA0006: '병원',
  CA9999: '기타',
};

function CertificationPost({ post, refetch, pageSize }: CertificationPostProps) {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(post?.isLike);
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const [deletePostSuccessToastIsOpen, setDeletePostSuccessToastIsOpen] = useState(false);
  const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (deletePostSuccessToastIsOpen) {
      setTimeout(() => {
        closeToastSuccessMessage()
      }, 2000);
    }
  }, [deletePostSuccessToastIsOpen]);

  const setCertificationLike = () => {
    certificationLike(
      user.id,
      post?.certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
          setIsLike(!isLike);
        }
      },
      dispatch,
    );
  };

  const deleteCertification = () => {
    deleteCertificationPost(
      user.id,
      post?.certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          oepnToastSuccessMessage()
          closeBottomSheet();
          refetch();
        } else {
          closeBottomSheet();
        }
      },
      dispatch,
    );
  };

  const moveToCommentPage = () => {
    dispatch(scrollActions.postsScroll({ scroll: window.scrollY, pageSize }));
    navigate(`/comments/${post?.certificationId}`, {
      state: { certificationId: post?.certificationId, posterId: post?.userId },
    });
  };

  const moveToUpdatePage = () => {
    dispatch(scrollActions.postsScroll({ scroll: window.scrollY, pageSize }));
    dispatch(
      uploadAction.setCertificationUpdate({
        img: post?.photoUrl,
        categoryKo: categoryCode[post?.categoryCode],
        title: post?.placeName,
        certificationId: post?.certificationId,
        content: post?.description,
      }),
    );
    navigate(CAMERA_PATH.UPDATE);
  };

  const oepnToastSuccessMessage = () => {
    setDeletePostSuccessToastIsOpen(true)
  };

  const closeToastSuccessMessage = () => {
    setDeletePostSuccessToastIsOpen(false)
  };

  const openBottomSheet = () => {
    setBottomSheetIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetIsOpen(false);
  };

  return (
    <>
      <header className="post-img-result-header">
        <div className="post-img-result-header-profile">
          <img className="post-img-result-header-profile-img" src={post?.user.profile} alt="copy url" />
          <div>
            <div className="post-img-result-header-profile-date">
              {' '}
              {post?.registDt.substring(0, 10)}&nbsp;
              {weekDay[post?.registDt.substring(17, post?.registDt.length)]}
              &nbsp;&nbsp;
              {post?.registDt.substring(11, 16)}
            </div>
            <div className="post-img-result-header-profile-name">{post?.user?.name}</div>
          </div>
        </div>
        {user.id !== post?.user.userId ? (
          <div className="post-img-result-header-report">신고</div>
        ) : (
          <div className="post-img-result-header-report">
            <div aria-hidden="true" onClick={moveToUpdatePage}>
              수정&nbsp;&nbsp;|
            </div>
            <div aria-hidden="true" onClick={openBottomSheet}>
              &nbsp;&nbsp;삭제
            </div>
          </div>
        )}
      </header>
      <main className="post-img-result-main">
        <img className="post-img-result-main-img" src={post?.photoUrl} width={window.innerWidth} alt="postImg" />
        <header className="post-img-result-main-header">
          <div className="post-img-result-main-header-place">
            <div className="post-img-result-main-header-place-name">{post?.placeName}</div>
            <div className="post-img-result-main-header-place-address">{post?.address}</div>
          </div>
          <img src={categoryIcon[post?.categoryCode]} alt="category-img" width={48} height={48} />
        </header>
        <body className="post-img-result-main-body">{post?.description}</body>
        <footer className="post-img-result-main-footer">
          <img
            className="post-img-result-main-footer-heart"
            src={isLike  ? FillHeart : Heart}
            alt="heart"
            aria-hidden="true"
            onClick={setCertificationLike}
          />
          <div className="post-img-result-main-footer-count">{likeCount}</div>
          <img
            className="post-img-result-main-footer-comments"
            src={Comments}
            alt="comments"
            aria-hidden="true"
            onClick={moveToCommentPage}
          />
          <div className="post-img-result-main-footer-count">{post?.commentCount}</div>
        </footer>
      </main>
      <div className="border-line" />
      {deletePostSuccessToastIsOpen && <ToastSuccessMessage message="게시물이 삭제 되었습니다." />}
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

export default CertificationPost;
