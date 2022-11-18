/* eslint-disable react/no-unused-prop-types */
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { certificationLike } from '../../common/api/certification';
import Bath from '../icons/bath.svg';
import Beauty from '../icons/beauty.svg';
import Cafe from '../icons/cafe.svg';
import Hospital from '../icons/hospital.svg';
import Walk from '../icons/walk.svg';
import Heart from '../icons/heart-empty.svg';
import FillHeart from '../icons/heart.svg';
import Comments from '../icons/comments.svg';
import { RootState } from '../../redux/store';

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

interface RecommendedPlaceProps  {
    post: postType;
  };
  
  interface postType {
    address: string;
    categoryCode: string;
    certificationId: number;
    commentCount: number;
    description: string;
    geoCode: string;
    isAchievements: number;
    isLike: number;
    isLive: number;
    isPhotoChecked: number;
    latitude: string;
    likeCount: number;
    longitude: string;
    mungpleId: number;
    pgeoCode: string;
    photoUrl: string;
    placeName: string;
    registDt: string;
    userId: number
    user:userType
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

function CertificationPost({ post }: RecommendedPlaceProps) {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(post?.isLike);
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const { user } = useSelector((state: RootState) => state.persist.user);

  console.log('post',post)

  const setCertificationLike = () => {
    certificationLike(
      user.id,
      post?.certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setLikeCount(isLike === 1 ? likeCount - 1 : likeCount + 1);
          setIsLike(isLike === 1 ? 0 : 1);
        }
      },
      dispatch,
    );
  };

  return (
    <>
      <header className="post-img-result-header">
        <div className="post-img-result-header-date">
          {post?.registDt.substring(0, 10)}&nbsp;
          {weekDay[post?.registDt.substring(17, post?.registDt.length)]}
          &nbsp;&nbsp;
          {post?.registDt.substring(11, 16)}
        </div>
        <div className="post-img-result-header-report">신고</div>
      </header>
      <main className="post-img-result-main">
        <img
          className="post-img-result-main-img"
          src={post?.photoUrl}
          width={window.innerWidth}
          height={window.innerWidth}
          alt="postImg"
        />
        <header className="post-img-result-main-header">
          <div className="post-img-result-main-header-place">
            <div className="post-img-result-main-header-place-name">{post?.placeName}</div>
            <div className="post-img-result-main-header-place-address">{post?.address}</div>
          </div>
          <img src={categoryIcon[post?.categoryCode]} alt="category-img" />
        </header>
        <body className="post-img-result-main-body">{post?.description}</body>
        <footer className="post-img-result-main-footer">
          <img
            className="post-img-result-main-footer-heart"
            src={isLike === 1 ? FillHeart : Heart}
            alt="heart"
            aria-hidden="true"
            onClick={setCertificationLike}
          />
          <div className="post-img-result-main-footer-count">{likeCount}</div>
          <img className="post-img-result-main-footer-comments" src={Comments} alt="comments" />
          <div className="post-img-result-main-footer-count">{post?.commentCount}</div>
        </footer>
      </main>
      <div className="border-line" />
    </>
  );
}

export default CertificationPost;
