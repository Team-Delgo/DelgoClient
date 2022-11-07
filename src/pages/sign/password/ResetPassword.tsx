import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { ReactComponent as Arrow } from '../../../common/icons/left-arrow.svg';
import { SIGN_IN_PATH } from '../../../common/constants/path.const';
import { changePassword } from '../../../common/api/login';
import { checkPassword, checkPasswordConfirm } from '../validcheck';
import './ResetPassword.scss';

function ResetPassword() {
  const [feedback, setFeedback] = useState({ password: '', confirm: '' });
  const [enteredInput, setEnteredInput] = useState({ password: '', confirm: '' });
  const [validInput, setValidInput] = useState({ password: '', confirm: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValid = validInput.confirm.length && validInput.password.length;
  const email = useLocation().state as string;

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
    changePassword(email, validInput.password, (response: AxiosResponse) => {
      navigate(SIGN_IN_PATH.MAIN);
    }, dispatch);
  };
  
  
  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigate(-1)}>
        <Arrow />
      </div>
      <header className="login-header">새 비밀번호 설정</header>
      <div className="login-description">
        인증이 완료되었습니다.
        <br />
        새로운 비밀번호를 입력해주세요.
      </div>
      <div className="login-input-box">
        <input
          className="login-input reset"
          placeholder="새 비밀번호 (최소8자 이상)"
          id="password"
          type="password"
          autoComplete="off"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{feedback.password}</p>
      </div>
      <div className="login-input-box">
        <input
          className="login-input reset-confirm"
          placeholder="새 비밀번호 확인"
          id="confirm"
          type="password"
          autoComplete="off"
          value={enteredInput.confirm}
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{feedback.confirm}</p>
      </div>
      <button
        type="button"
        disabled={!isValid}
        className={classNames('login-button', { active: isValid })}
        onClick={submitButtonHandler}
      >
        확인
      </button>
    </div>
  );
}

export default ResetPassword;
