import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function blockUser(
  myUserId: number,
  blockedUserId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/ban/${myUserId}/${blockedUserId}`);
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

export { blockUser };
