import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getMyPoint(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  console.log(userId)
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/point?userId=${userId}`);
  console.log('data', data);
  return data;
}

export { getMyPoint };