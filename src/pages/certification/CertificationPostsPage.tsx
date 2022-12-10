/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAnalyticsLogEvent } from '@react-query-firebase/analytics';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import FooterNavigation from '../../common/components/FooterNavigation';
import { getCertificationPostAll } from '../../common/api/certification';
import './CertificationPostsPage.scss';
import { RootState } from '../../redux/store';
import CertificationPost from '../../common/components/CertificationPost';
import Loading from '../../common/utils/Loading';
import PrevArrow from '../../common/icons/prev-arrow-black.svg';
import {analytics} from "../../index";
import { ROOT_PATH } from '../../common/constants/path.const';
import { scrollActions } from '../../redux/slice/scrollSlice';

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

function CertificationPostsPage() {
  const { user } = useSelector((state: RootState) => state.persist.user);
  const { scroll, pageSize } = useSelector((state: RootState) => state.persist.scroll.posts);
  const [pageSizeCount, setPageSizeCount] = useState(0);
  const dispatch = useDispatch();
  const mutation = useAnalyticsLogEvent(analytics, "screen_view");
  const location = useLocation();
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { data, status, fetchNextPage, isFetchingNextPage, refetch, isLoading } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => getCertificationPostAll(pageParam, user.id, pageSize, dispatch),
    {
      getNextPageParam: (lastPage: any) => (!lastPage.last ? lastPage.nextPage : undefined),
    },
  );

  useEffect(()=>{
    mutation.mutate({
      params: {
        firebase_screen: "FriendsCeritfications",
        firebase_screen_class: "FriendsCeritficationsPage"
      }
    });
  },[]);


  useEffect(() => {
    console.log('data',data)
    if (typeof data?.pages[0]?.content?.length === 'number') {
      setPageSizeCount(data?.pages[0]?.content?.length + pageSizeCount);
    }
  }, [data]);

  useEffect(() => {
    window.scroll(0, scroll);
  }, [isLoading]);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);


  const moveToHomePage = () => {
    dispatch(scrollActions.scrollInit());
    navigate(ROOT_PATH);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="certificationPostsPage">
      <div className="certificationPostsPage-header">
        <img
          src={PrevArrow}
          alt="back"
          aria-hidden="true"
          onClick={moveToHomePage}
        />
        <div className="certificationPostsPage-header-text">친구들의 기록</div>
      </div>
      {data?.pages?.map((page) => (
        <>
          {page?.content?.map((post: postType) => (
            <CertificationPost post={post} refetch={refetch} pageSize={pageSizeCount} />
          ))}
        </>
      ))}
      <div ref={ref}>&nbsp;</div>
    </div>
  );
}

export default CertificationPostsPage;
