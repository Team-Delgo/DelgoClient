import React from 'react';
import './PlaceCard.scss';
import BathSmall from '../../common/icons/bath-map-small.svg';
import CafeSmall from '../../common/icons/cafe-map-small.svg';
import BeautySmall from '../../common/icons/beauty-map-small.svg';
import WalkSmall from '../../common/icons/walk-map-small.svg';
import HospitalSmall from '../../common/icons/hospital-map-small.svg';
import EatSmall from '../../common/icons/eat-map-small.svg';

function CertCard(props: { img: string; title: string; description: string; categoryCode: string; registDt: string }) {
  const { img, title, description, registDt, categoryCode } = props;
  const descriptionText = description.length > 50 ? `${description.substring(0,50)}...` : description;
  let icon;
  if (categoryCode === 'CA0001') {
    icon = <img src={BathSmall} alt="" />;
  } else if (categoryCode === 'CA0002') {
    icon = <img src={CafeSmall} alt="" />;
  } else if (categoryCode === 'CA0003') {
    icon = <img src={BeautySmall} alt="" />;
  } else if (categoryCode === 'CA0004') {
    icon = <img src={WalkSmall} alt="" />;
  } else if (categoryCode === 'CA0005') {
    icon = <img src={HospitalSmall} alt="" />;
  } else {
    icon = <img src={EatSmall} alt="" />;
  }
  return (
    <div className="placecard">
      <img src={img} alt="cardimg" />
      <div className="placecard-box">
        <div className="placecard-box-title">
          {title}
          {icon}
          <div className="placecard-registDt">{registDt.slice(0,10)}</div>
        </div>
        <div className="placecard-box-address">{descriptionText}</div>
      </div>
    </div>
  );
}

export default CertCard;
