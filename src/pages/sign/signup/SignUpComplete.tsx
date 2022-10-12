import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SignUpComplete.scss';
import Delgo from '../../../common/icons/delgo.svg';
import Check from '../../../common/icons/check.svg';
import { ROOT_PATH } from '../../../common/constants/path.const';

interface PetName {
  name: string;
}

function SignUpComplete() {
  const state = useLocation().state as PetName;
  const navigate = useNavigate();
  return (
    <div className="complete">
      <img src={Delgo} alt="logo" className="complete-logo" />
      <div className="complete-circle">
        <img src={Check} alt="check" className="complete-check" />
      </div>
      <div className="complete-text">가입완료!</div>
      <button
        type="button"
        className="login-button active"
        onClick={() => {
          navigate(ROOT_PATH);
        }}
      >
        {state.name}와(과) 여행을 떠나요
      </button>
    </div>
  );
}

export default SignUpComplete;
