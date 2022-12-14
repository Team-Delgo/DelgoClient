import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getMyPoint(userId: number) {
  const { data } = await axiosInstance.get(`/user/point?userId=${userId}`);
  return data;
}

export { getMyPoint };