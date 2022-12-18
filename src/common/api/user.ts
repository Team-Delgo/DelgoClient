import  { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getUserInfo(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
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

export { getUserInfo,getMyPoint };
