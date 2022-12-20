import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

function login(data: { email: string; password: string }, success: (data: AxiosResponse) => void, dispatch: any) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/login`, {
      email: data.email,
      password: data.password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function emailAuth(email: string, success: (data: AxiosResponse) => void, dispatch: any) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/auth/email`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  axios
    .put(`${process.env.REACT_APP_API_URL}/user/password`, {
      email,
      newPassword: password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { login, emailAuth, changePassword };
