import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';


async function login(data: { email: string; password: string }, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
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

async function tokenRefresh(data: { refreshToken: string }, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/tokenReissue`, {
      headers: {
        Authorization_Refresh: `${data.refreshToken}`,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function emailAuth(email: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/emailAuth`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
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

export { login, tokenRefresh, emailAuth, changePassword };
