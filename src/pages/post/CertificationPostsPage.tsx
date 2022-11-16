/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getCertificationPostAll } from '../../common/api/certification';
import './CertificationPostsPage.scss';
import { RootState } from '../../redux/store';


interface userType {
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
  categoryCode: string;
  certificationId: number;
  description: string;
  geoCode: string;
  isAchievements: number;
  isPhotoChecked: number;
  latitude: string;
  likeCount: number;
  longitude: string;
  mungpleId: number;
  pgeoCode: string;
  photoUrl: string;
  placeName: string;
  registDt: string;
  userId: number;
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

function CertificationPostsPage() {
  const { user } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getCertificationPostAll(pageParam, user.id, dispatch),
    {
      getNextPageParam: (lastPage: any) => (!lastPage.last ? lastPage.nextPage : undefined),
    },
  );

  useEffect(() => {
    window.scroll(0, 0);
    console.log('data', data);
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  // if (status === 'loading') {
  //   return <div>loading</div>;
  // }

  // if (status === 'error') {
  //   return <div>error</div>;
  // }

  return (
    <>
      {data?.pages?.map((page) => (
        <>
          {page?.content?.map((post: any) => (
            <>
              <header className="post-img-result-header">
                <div className="post-img-result-header-date">
                  {post?.registDt.substring(0, 10)}&nbsp;
                  {weekDay[post?.registDt.substring(17, post?.registDt.length)]}
                  &nbsp;&nbsp;&nbsp;
                  {post?.registDt.substring(11, 16)}
                </div>
                <div className="post-img-result-header-report">신고</div>
              </header>
              <main className="post-img-result-main">
                <img src={post?.photoUrl} width={window.innerWidth} height={window.innerWidth} alt="postImg" />
                <header className="post-img-result-main-profile">
                  <img className="post-img-result-main-profile-img" src={post?.user?.profile} alt="copy url" />
                  <div className="post-img-result-main-profile-second">
                    <div className="post-img-result-main-profile-second-address">{post?.user?.address}</div>
                    <div className="post-img-result-main-profile-second-name">{post?.user?.name}</div>
                  </div>
                </header>
                <body className="post-img-result-main-body">
                  <div className="post-img-result-main-body-title">{post?.placeName}</div>
                  <div className="post-img-result-main-body-content">{post?.description}</div>
                </body>
              </main>
            </>
          ))}
        </>
      ))}
      <div ref={ref}>&nbsp;</div>
      <FooterNavigation />
    </>
  );
}

export default CertificationPostsPage;
