import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../common/api/login';
import { MY_ACCOUNT_PATH } from '../../common/constants/path.const';
import {RootState} from '../../redux/store'
import LeftArrow from '../../common/icons/left-arrow.svg';
import "./ChangePasswordCheck.scss";

function ChangePasswordCheck() {
  const [enteredInput, setEnteredInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.persist.user.user.email);
  
  const passwordCheck = () => {
    login({ email, password: enteredInput }, (res: AxiosResponse) => {
      console.log(res);
      const { code } = res.data;
      if (code !== 200) {
        setInvalid(true);
        setFeedback('비밀번호가 일치하지 않습니다.');
      } else {
        navigate(MY_ACCOUNT_PATH.PASSWORDCHANGE);
      }
    }, dispatch);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(e.target.value);
    setFeedback('');
    setInvalid(false);
  };

  return (
    <div className='userinfo'>
      <div className="userinfo-header">
        <img
          src={LeftArrow}
          alt="back"
          aria-hidden="true"
          className="userinfo-header-back"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="userinfo-header-title">비밀번호 변경</div>
      </div>
      <div className='userinfo-wrapper'>
        <input type="password" value={enteredInput} onChange={inputChangeHandler} placeholder='기존 비밀번호' className={classNames('login-input passwordcheck', { invalid })} />
        <p className="login-feedback">{feedback}</p>
      </div>
      <button type='button' className='login-button active' onClick={passwordCheck}>새 비밀번호 설정</button>
    </div>
  );
}

export default ChangePasswordCheck;
