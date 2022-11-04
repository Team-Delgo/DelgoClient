/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { AnyIfEmpty, useDispatch } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getCertificationPostAll } from '../../common/api/certification';
import './CertificationPostsPage.scss';


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
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getCertificationPostAll(pageParam, dispatch),
    {
      getNextPageParam: (lastPage:any) => (!lastPage.last ? lastPage.nextPage : undefined),
    },
  );

  useEffect(() => {
    window.scroll(0, 0);
    console.log(data?.pages)
  }, [data]);



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
          {page?.content?.map((post: Array<any>) => (
            <>
              <header className="post-img-result-header">
                <div className="post-img-result-header-date">
                  {post[1]?.registDt.substring(0, 10)}&nbsp;{weekDay[post[1]?.registDt.substring(17, post[1]?.registDt.length)]}
                  &nbsp;&nbsp;&nbsp;
                  {post[1]?.registDt.substring(11, 16)}
                </div>
                <div className="post-img-result-header-report">신고</div>
              </header>
              <main className="post-img-result-main">
                <img src={post[1]?.photoUrl} width={window.innerWidth} height={window.innerWidth} alt="postImg" />
                <header className="post-img-result-main-profile">
                  <img
                    className="post-img-result-main-profile-img"
                    src={post[0]?.profile}
                    alt="copy url"
                  />
                  <div className="post-img-result-main-profile-second">
                    <div className="post-img-result-main-profile-second-address">서울시 송파구</div>
                    <div className="post-img-result-main-profile-second-name">{post[0]?.name}</div>
                  </div>
                </header>
                <body className="post-img-result-main-body">
                  <div className="post-img-result-main-body-title">{post[1]?.placeName}</div>
                  <div className="post-img-result-main-body-content">{post[1]?.description}</div>
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
