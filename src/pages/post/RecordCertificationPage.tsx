import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cert } from '../map/MapType';
import RecordCertification from './RecordCertification';
import Back from "../../common/icons/prev-arrow-black.svg";
import "./RecordCertificationPage.scss";
import { RECORD_PATH } from '../../common/constants/path.const';

export interface Certification {
  address: string;
  cerificationId: number;
  description: string;
  photoUrl: string;
  placeName: string;
  categoryCode: string;
}

interface LocationState{
  certifications : Cert[];
  pageFrom: string;
}

function RecordCertificationPage() {
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationState;
  const {certifications, pageFrom} = locationState;
  const contents = certifications.map((e:Cert) => {
    return <RecordCertification certification={e}/>
  }) 

  return <div className='record-certs'>
    <div className='record-certs-header'>
      <img src={Back} alt="back" aria-hidden="true" onClick={()=>{navigate(pageFrom)}}/>
      <div className='record-certs-header-date'>{certifications[0].registDt.slice(0,10)}</div>
    </div>
    {contents}
  </div>
}

export default RecordCertificationPage;
