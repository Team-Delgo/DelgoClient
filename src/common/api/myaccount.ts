import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import axiosInstance from './interceptors';

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; breed: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, name, birthday, breed } = data;
  await axiosInstance
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

async function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axiosInstance
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

async function changeGeoCode(email: string, geoCode:string, pGeoCode:string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axiosInstance
    .put(`/account/user`, {
      email,
      geoCode,
      pGeoCode
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function changeName(email: string, name:string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axiosInstance
    .put(`/account/user`, {
      email,
      name
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { changePetInfo, changePassword, changeGeoCode,changeName };
