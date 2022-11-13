import React, { useState } from 'react';
import { Certification } from './RecordCertificationPage';
import VerticalDevider from '../../common/icons/vertical-devide.svg';
import Cafe from '../../common/icons/cafe.svg';
import Walk from '../../common/icons/walk.svg';
import Hair from '../../common/icons/beauty.svg';
import Hospital from '../../common/icons/hospital.svg';
import Bath from '../../common/icons/bath.svg';
import Eat from '../../common/icons/eat.svg';
import Heart from '../../common/icons/heart-empty.svg';
import FillHeart from '../../common/icons/heart.svg';
import Comments from '../../common/icons/comments.svg';
import { Cert } from '../map/MapType';
import './RecordCertification.scss';

function RecordCertification(props: { certification: Cert }) {
  const { certification } = props;
  const [selfHeart, setSelfHeart] = useState(false);

  let icon;
  if (certification.categoryCode === 'CA0001') icon = Walk;
  else if (certification.categoryCode === 'CA0002') icon = Cafe;
  else if (certification.categoryCode === 'CA0003') icon = Eat;
  else if (certification.categoryCode === 'CA0004') icon = Bath;
  else if (certification.categoryCode === 'CA0005') icon = Hair;
  else if (certification.categoryCode === 'CA0006') icon = Hospital;
  else icon = Walk;
  return (
    <div className="record-cert">
      <div className="record-cert-edit">
        <div>수정</div>
        <img src={VerticalDevider} alt="devider" />
        <div>삭제</div>
      </div>
      <img className="record-cert-img" src={certification.photoUrl} alt={certification.placeName} />
      <div className="record-cert-main">
        <div className="record-cert-main-text">
          <div className="record-cert-main-text-title">{certification.placeName}</div>
          <div className="record-cert-main-text-sub">{certification.address}</div>
        </div>
        <img src={icon} alt="icon" />
      </div>
      <div className="record-cert-devider" />
      <div className="record-cert-description">{certification.description}</div>
      <div className="record-cert-icons">
        <img
          className="record-cert-icons-heart"
          src={selfHeart ? FillHeart:Heart}
          alt="heart"
          aria-hidden="true"
          onClick={() => {
            setSelfHeart(!selfHeart);
          }}
        />
        {certification.likeCount > 0 && <div className="record-cert-icons-count">{certification.likeCount}</div>}
        <img className="record-cert-icons-comments" src={Comments} alt="comments" />
        {certification.commentCount > 0 && <div className="record-cert-icons-count">{certification.commentCount}</div>}
      </div>
    </div>
  );
}

export default RecordCertification;
