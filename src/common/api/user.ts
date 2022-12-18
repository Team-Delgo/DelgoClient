import  { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getUserInfo(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axiosInstance.get(`/comment?userId=${userId}`);
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

export { getUserInfo };
