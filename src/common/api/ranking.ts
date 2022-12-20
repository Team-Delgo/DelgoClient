import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getTopRankingList(geoCode: number) {
  const { data } = await axiosInstance.get(`/ranking/point/top?geoCode=${geoCode}`);
  return data;
}

async function getMyPetRanking(userId: number) {
  const { data } = await axiosInstance.get(`/ranking/user?userId=${userId}`);
  return data;
}

export { getTopRankingList, getMyPetRanking };
