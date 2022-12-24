/* eslint-disable react/no-unused-prop-types */
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";
import { certificationLike, deleteCertificationPost } from '../../common/api/certification';
import Bath from '../icons/bath.svg';
import Beauty from '../icons/beauty.svg';
import Cafe from '../icons/cafe.svg';
import Hospital from '../icons/hospital.svg';
import Restorant from '../icons/restorant.svg';
import Walk from '../icons/walk.svg';
import ETC from '../icons/etc.svg';
import Heart from '../icons/heart-empty.svg';
import FillHeart from '../icons/heart.svg';
import Comments from '../icons/comments.svg';
import { RootState } from '../../redux/store';
import { CAMERA_PATH } from '../constants/path.const';
import { uploadAction } from '../../redux/slice/uploadSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import DeleteBottomSheet from '../dialog/ConfirmBottomSheet';
import ToastPurpleMessage from '../dialog/ToastPurpleMessage';
import { banUser } from '../api/ban';
import { analytics } from "../../index";
import { postType } from '../types/post';
import {weekDay} from '../types/week'
import {categoryIcon2,categoryCode2} from '../types/category'

// interface categoryType {
//   CA0001: string;
//   CA0002: string;
//   CA0003: string;
//   CA0004: string;
//   CA0005: string;
//   CA0006: string;
//   CA9999: string;
//   [prop: string]: any;
// }

// const categoryIcon: categoryType2 = {
//   CA0001: Walk,
//   CA0002: Cafe,
//   CA0003: Restorant,
//   CA0004: Bath,
//   CA0005: Beauty,
//   CA0006: Hospital,
//   CA9999: ETC,
// };

// const categoryCode: categoryType2 = {
//   CA0001: '산책',
//   CA0002: '카페',
//   CA0003: '식당',
//   CA0004: '목욕',
//   CA0005: '미용',
//   CA0006: '병원',
//   CA9999: '기타',
// };

interface CertificationPostPropsType {
  post: postType;
  refetch: () => void;
  pageSize:number;
}

function CertificationPost({ post, refetch, pageSize }: CertificationPostPropsType) {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(post?.isLike);
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const [blockedUserName, setBlockedUserName] = useState(post?.likeCount);
  const [deletePostSuccessToastIsOpen, setDeletePostSuccessToastIsOpen] = useState(false);
  const [blockUserSuccessToastIsOpen, setBlockUserSuccessToastIsOpen] = useState(false);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [blockUserbottomSheetIsOpen, setBlockUserBottomSheetIsOpen] = useState(false);
  const [likeIsLoading, setLikeIsLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.persist.user);
  const navigate = useNavigate();
  const location = useLocation();
  const heartEvent = useAnalyticsCustomLogEvent(analytics, 'cert_like');
  const commentEvent = useAnalyticsCustomLogEvent(analytics, 'cert_comment_view');

  console.log('post?.categoryCode',post?.categoryCode)

  useEffect(() => {
    if (deletePostSuccessToastIsOpen) {
      setTimeout(() => {
        closeToastSuccessMessage();
      }, 2000);
    }
  }, [deletePostSuccessToastIsOpen]);

  useEffect(() => {
    if (blockUserSuccessToastIsOpen) {
      setTimeout(() => {
        closeBlockToastSuccessMessage();
      }, 2000);
    }
  }, [blockUserSuccessToastIsOpen]);

  const handleCertificationLike = () => {
    setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
    setIsLike(!isLike);
    certificationLike(
      user.id,
      post?.certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          console.log('좋아요 성공ㅋ')
          heartEvent.mutate();
        }
      },
      dispatch,
    );
  };

  const deleteCertification = useCallback(() => {
    deleteCertificationPost(
      user.id,
      post?.certificationId,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          oepnToastSuccessMessage();
          closeBottomSheet();
          refetch();
        } else {
          closeBottomSheet();
        }
      },
      dispatch,
    );
  },[])

  const handleBlockUser = useCallback(() => {
    banUser(
      user.id,
      post?.user?.userId,
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        if (code === 200) {
          setBlockedUserName(data?.name);
          oepnBlockToastSuccessMessage();
          closeBlockBottomSheet();
          refetch();
        } else {
          closeBlockBottomSheet();
        }
      },
      dispatch,
    );
  },[])

  const moveToCommentPage = () => {
    commentEvent.mutate();
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
        categoryKo: categoryCode2[post?.categoryCode],
        title: post?.placeName,
        certificationId: post?.certificationId,
        content: post?.description,
      }),
    );
    navigate(CAMERA_PATH.UPDATE, {
      state: {
        prevPath: location.pathname,
      },
    });
  }

  const oepnToastSuccessMessage = useCallback(() => {
    setDeletePostSuccessToastIsOpen(true);
  }, []);

  const closeToastSuccessMessage = useCallback(() => {
    setDeletePostSuccessToastIsOpen(false);
  }, []);

  const openBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(false);
  }, []);

  const oepnBlockToastSuccessMessage = useCallback(() => {
    setBlockUserSuccessToastIsOpen(true);
  }, []);

  const closeBlockToastSuccessMessage = useCallback(() => {
    setBlockUserSuccessToastIsOpen(false);
  }, []);

  const openBlockBottomSheet = useCallback(() => {
    setBlockUserBottomSheetIsOpen(true);
  }, []);

  const closeBlockBottomSheet = useCallback(() => {
    setBlockUserBottomSheetIsOpen(false);
  }, []);

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
          <div className="post-img-result-header-report" aria-hidden="true" onClick={openBlockBottomSheet}>
            신고
          </div>
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
          <img src={categoryIcon2[post?.categoryCode]} alt="category-img" width={48} height={48} />
        </header>
        <body className="post-img-result-main-body">{post?.description}</body>
        <footer className="post-img-result-main-footer">
          <img
            className="post-img-result-main-footer-heart"
            src={isLike ? FillHeart : Heart}
            alt="heart"
            aria-hidden="true"
            onClick={handleCertificationLike}
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
      {deletePostSuccessToastIsOpen && <ToastPurpleMessage message="게시물이 삭제 되었습니다." />}
      <DeleteBottomSheet
        text="기록을 삭제하실건가요?"
        description="지우면 다시 볼 수 없어요"
        cancelText="취소"
        acceptText="삭제"
        acceptButtonHandler={deleteCertification}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />

      {blockUserSuccessToastIsOpen && <ToastPurpleMessage message={`${blockedUserName}님을 신고 하였습니다`} />}
      <DeleteBottomSheet
        text={`${post?.user?.name} 님을 신고 하시겠어요?`}
        description={`앞으로 ${post?.user?.name} 님의 게시물을 볼 수 없어요`}
        cancelText="취소"
        acceptText="신고"
        acceptButtonHandler={handleBlockUser}
        cancelButtonHandler={closeBlockBottomSheet}
        bottomSheetIsOpen={blockUserbottomSheetIsOpen}
      />
    </>
  );
}

export default CertificationPost;
