import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../common/api/myaccount';
import { MY_ACCOUNT_PATH } from '../../common/constants/path.const';
import {RootState} from '../../redux/store'
import LeftArrow from '../../common/icons/left-arrow.svg';
import { checkPassword, checkPasswordConfirm } from '../sign/validcheck';
import "./ChangePassword.scss";

function ChangePassword() {
  const [feedback, setFeedback] = useState({ password: '', confirm: '' });
  const [enteredInput, setEnteredInput] = useState({ password: '', confirm: '' });
  const [validInput, setValidInput] = useState({ password: '', confirm: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.persist.user.user.email);
  const isValid = validInput.confirm.length && validInput.password.length;
  const dispatch = useDispatch();
  
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEnteredInput((prev) => {
      return { ...prev, [id]: value };
    });


    if (id === 'password') {
      passwordValidCheck(value);
    } else {
      passwordConfirmValidCheck(value);
    }
  };

  const passwordValidCheck = (value: string) => {
    const response = checkPassword(value);
    console.log(response);
    if (!response.isValid) {
      console.log(response);
      setValidInput((prev) => {
        return { ...prev, password: '' };
      });
    } else {
      setValidInput((prev) => {
        return { ...prev, password: value };
      });
    }

    if (confirmIsTouched && !response.isValid) {
      const { confirm } = enteredInput;
      const check = checkPasswordConfirm(value, confirm);

      setFeedback((prev) => {
        return { ...prev, confirm: check.message };
      });
    }

    setFeedback((prev) => {
      return { ...prev, password: response.message };
    });
    if (enteredInput.confirm.length) {
      const { confirm } = enteredInput;
      const check = checkPasswordConfirm(value, confirm);
      setFeedback((prev) => {
        return { ...prev, confirm: check.message };
      });
      if (!check.isValid) {
        console.log('aa');
        setValidInput((prev) => {
          return { ...prev, confirm: '' };
        });
      } else {
        setValidInput((prev) => {
          return { ...prev, confirm: value };
        });
      }
    }
  };

  const passwordConfirmValidCheck = (value: string) => {
    const { password } = enteredInput;
    const response = checkPasswordConfirm(password, value);

    if (!response.isValid) {
      setValidInput((prev) => {
        return { ...prev, confirm: '' };
      });
    } else {
      setValidInput((prev) => {
        return { ...prev, confirm: value };
      });
    }
    setFeedback((prev) => {
      return { ...prev, confirm: response.message };
    });
    setConfirmIsTouched(true);
  };

  const submitButtonHandler = () => {
    changePassword(email, validInput.password,dispatch, (response: AxiosResponse) => {
      navigate(MY_ACCOUNT_PATH.MAIN);
    });
  };

  return <div className='userinfo'>
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
      <input id='password' onChange={inputChangeHandler} type="password" value={enteredInput.password} placeholder='새 비밀번호' className={classNames('login-input passwordcheck', { invalid: feedback.password.length })} />
      <p className="login-feedback">{feedback.password}</p>
    </div>
    <div className='userinfo-wrapper'>
      <input id='confirm' onChange={inputChangeHandler} type="password" value={enteredInput.confirm} placeholder='새 비밀번호 확인' className={classNames('login-input passwordchange', { invalid: feedback.confirm.length })} />
      <p className="login-feedback">{feedback.confirm}</p>
    </div>
    <button onClick={submitButtonHandler} disabled={!isValid} type='button' className={classNames('login-button', { active: isValid })}>새 비밀번호 설정</button>
  </div>
};

export default ChangePassword;