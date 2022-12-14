import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import axiosInstance from './interceptors';

async function getMyAccountDataList(userId: number) {
  const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/myAccount`, {
    params: { userId },
  });
  console.log(data);
  return data;
}

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; breed: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, name, birthday, size } = data;
  await axiosInstance
    .post(`${process.env.REACT_APP_API_URL}/changePetInfo`, {
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
    .post(`${process.env.REACT_APP_API_URL}/changePassword`, {
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
    .post(`${process.env.REACT_APP_API_URL}/changeUserInfo`, {
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
    .post(`${process.env.REACT_APP_API_URL}/changeUserInfo`, {
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

export { getMyAccountDataList, changePetInfo, changePassword, changeGeoCode,changeName };
