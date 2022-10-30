import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getTopRankingList(geoCode: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/ranking/point/top?geoCode=${geoCode}`);
  console.log(data);
  return data;
}

async function getMyPetRanking(userId: number) {
    const accessToken = localStorage.getItem('accessToken') || '';
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/ranking/user?userId=${userId}`);
    console.log(data);
    return data;
  }

export { getTopRankingList,getMyPetRanking};
