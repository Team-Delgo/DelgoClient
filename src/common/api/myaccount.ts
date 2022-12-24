import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import axiosInstance from './interceptors';

function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; breed: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, name, birthday, breed } = data;
  axiosInstance
    .put(`/account/pet`, {
      email,
      name,
      birthday,
      breed,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .put(`/account/password`, {
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

function changeGeoCode(email: string, geoCode: string, pGeoCode: string, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .put(`/account/user`, {
      email,
      geoCode,
      pGeoCode,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function changeName(email: string, name: string, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .put(`/account/user`, {
      email,
      name,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function setPushNotification(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .put(`/account/notify/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}


function logOut(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .post(`/account/logout/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getMyInfo(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axiosInstance.get(`/user?userId=${userId}`);
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

async function getMyPoint(userId: number) {
  const { data } = await axiosInstance.get(`/account/point?userId=${userId}`);
  return data;
}


export { changePetInfo, changePassword, changeGeoCode, changeName, setPushNotification, logOut, getMyInfo, getMyPoint };
