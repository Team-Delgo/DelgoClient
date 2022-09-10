import React from 'react';

function ActivityLog() {
  return (
    <div className="home-page-dog-history-body-activity-log">
      <header className="home-page-dog-history-body-activity-log-title">몽자의 출석부</header>
      <div className="home-page-dog-history-body-activity-log-sub-title">누적 기록을 확인해요</div>
      <div className="home-page-dog-history-body-activity-log-line">
        <div className="home-page-dog-history-body-activity-log-line-walk">
          <div className="home-page-dog-history-body-activity-log-line-walk-label">산책</div>
          <div className="home-page-dog-history-body-activity-log-line-walk-count">1회</div>
        </div>
        <div className="home-page-dog-history-body-activity-log-line-cafe">
          <div className="home-page-dog-history-body-activity-log-line-cafe-label">카페</div>
          <div className="home-page-dog-history-body-activity-log-line-cafe-count">1회</div>
        </div>
        <div className="home-page-dog-history-body-activity-log-line-restaurant">
          <div className="home-page-dog-history-body-activity-log-line-restaurant-label">식당</div>
          <div className="home-page-dog-history-body-activity-log-line-restaurant-count">1회</div>
        </div>
      </div>
      <div className="home-page-dog-history-body-activity-log-line">
        <div className="home-page-dog-history-body-activity-log-line-bath">
          <div className="home-page-dog-history-body-activity-log-line-bath-label">목욕</div>
          <div className="home-page-dog-history-body-activity-log-line-bath-count">1회</div>
        </div>
        <div className="home-page-dog-history-body-activity-log-line-beauty">
          <div className="home-page-dog-history-body-activity-log-line-beauty-label">미용</div>
          <div className="home-page-dog-history-body-activity-log-line-beauty-count">1회</div>
        </div>
        <div className="home-page-dog-history-body-activity-log-line-hospital">
          <div className="home-page-dog-history-body-activity-log-line-hospital-label">병원</div>
          <div className="home-page-dog-history-body-activity-log-line-hospital-count">1회</div>
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
