import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCertificationDataCount } from '../../../common/api/certification';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { GET_CERTIFICATION_DATA_COUNT, CACHE_TIME, STALE_TIME } from '../../../common/constants/queryKey.const';
import { RECORD_PATH } from '../../../common/constants/path.const';
import { RootState } from '../../../redux/store';

function ActivityLog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,pet} = useSelector((state: RootState) => state.persist.user);

  const { isLoading: getCertificationDataCountIsLoading, data: certificationDataCount } = useQuery(
    GET_CERTIFICATION_DATA_COUNT,
    () => getCertificationDataCount(user.id),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const moveToPhotoPage = (category: string) => (event: React.MouseEvent) => {
    setTimeout(() => {
      navigate(RECORD_PATH.PHOTO, { state: {category, from:'home'} });
    }, 200);
  };

  return (
    <>
    <div className="home-page-dog-history-body-activity-log">
      <header className="home-page-dog-history-body-activity-log-title">{user.nickname}의 누적기록</header>
      {/* <div className="home-page-dog-history-body-activity-log-sub-title">지난 활동기록을 항목별로 확인해요</div> */}
      <div className="home-page-dog-history-body-activity-log-line">
        <div
          className="home-page-dog-history-body-activity-log-line-walk"
          aria-hidden="true"
          onClick={moveToPhotoPage('산책')}
        >
          <div className="home-page-dog-history-body-activity-log-line-walk-label">산책</div>
          <div className="home-page-dog-history-body-activity-log-line-walk-count">
            {certificationDataCount?.data.산책}
          </div>
        </div>
        <div
          className="home-page-dog-history-body-activity-log-line-cafe"
          aria-hidden="true"
          onClick={moveToPhotoPage('카페')}
        >
          <div className="home-page-dog-history-body-activity-log-line-cafe-label">카페</div>
          <div className="home-page-dog-history-body-activity-log-line-cafe-count">
            {certificationDataCount?.data.카페}
          </div>
        </div>
      </div>
      <div className="home-page-dog-history-body-activity-log-line">
        <div
          className="home-page-dog-history-body-activity-log-line-restaurant"
          aria-hidden="true"
          onClick={moveToPhotoPage('식당')}
        >
          <div className="home-page-dog-history-body-activity-log-line-restaurant-label">식당</div>
          <div className="home-page-dog-history-body-activity-log-line-restaurant-count">
            {certificationDataCount?.data.식당}
          </div>
        </div>
        <div
          className="home-page-dog-history-body-activity-log-line-bath"
          aria-hidden="true"
          onClick={moveToPhotoPage('목욕')}
        >
          <div className="home-page-dog-history-body-activity-log-line-bath-label">목욕</div>
          <div className="home-page-dog-history-body-activity-log-line-bath-count">
            {certificationDataCount?.data.목욕}
          </div>
        </div>
      </div>
      <div className="home-page-dog-history-body-activity-log-line">
        <div
          className="home-page-dog-history-body-activity-log-line-beauty"
          aria-hidden="true"
          onClick={moveToPhotoPage('미용')}
        >
          <div className="home-page-dog-history-body-activity-log-line-beauty-label">미용</div>
          <div className="home-page-dog-history-body-activity-log-line-beauty-count">
            {certificationDataCount?.data.미용}
          </div>
        </div>
        <div
          className="home-page-dog-history-body-activity-log-line-hospital"
          aria-hidden="true"
          onClick={moveToPhotoPage('병원')}
        >
          <div className="home-page-dog-history-body-activity-log-line-hospital-label">병원</div>
          <div className="home-page-dog-history-body-activity-log-line-hospital-count">
            {certificationDataCount?.data.병원}
          </div>
        </div>
      </div>
    </div>
    <div className="border-line" />
    </>
  );
}

export default ActivityLog;
