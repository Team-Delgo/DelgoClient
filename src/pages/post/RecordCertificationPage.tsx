import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cert } from '../map/MapType';
import RecordCertification from './RecordCertification';
import Back from '../../common/icons/prev-arrow-black.svg';
import './RecordCertificationPage.scss';
import { RECORD_PATH } from '../../common/constants/path.const';
import Loading from '../../common/utils/Loading';

export interface Certification {
  address: string;
  cerificationId: number;
  description: string;
  photoUrl: string;
  placeName: string;
  categoryCode: string;
}

interface LocationState {
  certifications: Cert[];
  pageFrom: string;
}

function RecordCertificationPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationState;
  const { certifications, pageFrom } = locationState;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: 'start' });
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const contents = certifications.map((e: Cert) => {
    return <RecordCertification certification={e} />;
  });

  return (
    <div className="record-certs" ref={scrollRef}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="record-certs-header">
            <img
              src={Back}
              alt="back"
              aria-hidden="true"
              onClick={() => {
                navigate(pageFrom);
              }}
            />
            <div className="record-certs-header-date">{certifications[0].registDt.slice(0, 10)}</div>
          </div>
          <div className="record-certs-content">{contents}</div>
        </>
      )}
    </div>
  );
}

export default RecordCertificationPage;
