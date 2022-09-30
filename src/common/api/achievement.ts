import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getAchievementList(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/achievements/user-data?userId=${userId}`);
  console.log(data);
  return data;
}

export { getAchievementList };
