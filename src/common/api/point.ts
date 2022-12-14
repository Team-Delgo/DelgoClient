import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getMyPoint(userId: number) {
  const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/user/point?userId=${userId}`);
  return data;
}

export { getMyPoint };