import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function banUser(
  myUserId: number,
  blockedUserId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axiosInstance.post(`/ban/${myUserId}/${blockedUserId}`);
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

export { banUser };
