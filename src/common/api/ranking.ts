import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getTopRankingList(geoCode: number) {
  console.log('geoCode', geoCode);
  const { data } = await axiosInstance.get(`/ranking/point/top?geoCode=${geoCode}`);
  console.log('data', data);
  return data;
}

async function getMyPetRanking(userId: number) {
  console.log('userId', userId);
  const { data } = await axiosInstance.get(`/ranking/user?userId=${userId}`);
  console.log('myPetRanking',data);
  return data;
}

export { getTopRankingList, getMyPetRanking };
