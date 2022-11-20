/* eslint-disable react/jsx-no-useless-fragment */
import axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getCertificationPostAll } from '../../common/api/certification';
import './CertificationPostsPage.scss';
import { RootState } from '../../redux/store';
import Bath from '../../common/icons/bath.svg';
import Beauty from '../../common/icons/beauty.svg';
import Cafe from '../../common/icons/cafe.svg';
import Hospital from '../../common/icons/hospital.svg';
import Walk from '../../common/icons/walk.svg';
import Heart from '../../common/icons/heart-empty.svg';
import FillHeart from '../../common/icons/heart.svg';
import Comments from '../../common/icons/comments.svg';
import { certificationLike } from '../../common/api/certification';
import CertificationPost from '../../common/components/CertificationPost';

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

function CertificationPostsPage() {
  const { user } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getCertificationPostAll(pageParam, user.id, dispatch),
    {
      getNextPageParam: (lastPage: any) => (!lastPage.last ? lastPage.nextPage : undefined),
    },
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  // if (status === 'loading') {
  //   return <div>loading</div>;
  // }

  // if (status === 'error') {
  //   return <div>error</div>;
  // }

  // const setCertificationLike = (userId:number,certificationId:number) => {
  //   certificationLike(
  //     userId,
  //     certificationId,
  //     (response: AxiosResponse) => {
  //       if (response.data.code === 200)
  //     },
  //     dispatch,
  //   );
  // };

  return (
    <>
    <div className="other-dog-history">친구들의 기록</div>
      {data?.pages?.map((page) => (
        <>
          {page?.content?.map((post: postType) => (
            <CertificationPost post={post} refetch={refetch}/>
          ))}
        </>
      ))}
      <div ref={ref}>&nbsp;</div>
      <FooterNavigation />
    </>
  );
}

export default CertificationPostsPage;
