import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCertificationPostsByMain } from '../../../common/api/certification';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { POSTS_PATH } from '../../../common/constants/path.const';
import { CACHE_TIME, GET_CERTIFICATION_POSTS_LIST_BY_MAIN, STALE_TIME } from '../../../common/constants/queryKey.const';
import { RootState } from '../../../redux/store';


interface rankingType {
  categoryCode:string 
  certificationId:number
  description: string
  geoCode: string
  isAchievements: number
  isPhotoChecked: number
  latitude: string
  likeCount: number
  longitude: string
  mungpleId: number
  pgeoCode: string
  photoUrl: string
  placeName: string
  registDt: string
  userId: number
}


function NeighborPosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.persist.user);

  const { isLoading: getCertificationPostsByMainIsLoading, data: certificationPostsDataList } = useQuery(
    GET_CERTIFICATION_POSTS_LIST_BY_MAIN,
    () => getCertificationPostsByMain(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const moveToPostsPage = () => {
    console.log(1);
    navigate(POSTS_PATH);
  };

  return (
    <div className="home-page-neighbord-posts">
      <header className="home-page-neighbord-posts-header">
        <div className="home-page-neighbord-posts-header-title">다른 친구들의 하루</div>
        <div className="home-page-neighbord-posts-header-all" aria-hidden="true" onClick={moveToPostsPage}>
          더보기
        </div>
      </header>
      <main className="home-page-neighbord-posts-container">
        {certificationPostsDataList?.data?.map((post: rankingType) => (
          <div className="home-page-neighbord-post" key={post.certificationId} >
            <img src={post.photoUrl} alt="post-img"  aria-hidden="true" onClick={moveToPostsPage}/>
          </div>
        ))}
      </main>
    </div>
  );
}

export default NeighborPosts;
