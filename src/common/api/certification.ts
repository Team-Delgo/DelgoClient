import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getMungPlaceList(categoryCode: string) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/mungple/data-category?categoryCode=${categoryCode}`,
  );
  return data;
}

async function getCertificationDataCount(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';

  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/certification/data-count?userId=${userId}`);
  return data;
}

async function registerCertificationPost(
  data: {
    userId: number;
    categoryCode: string;
    mungpleId: number;
    placeName: string;
    description: string;
    latitude: string;
    longitude: string;
    photo: string;
  },
  success: (data: AxiosResponse) => void,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/certification/register`, {
      userId: data.userId,
      categoryCode: data.categoryCode,
      mungpleId: data.mungpleId,
      placeName: data.placeName,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      photo: data.photo,
    });
    console.log(result);
    success(result);
  } catch (err: any) {
    console.log(err);
  }
}

export { getMungPlaceList, getCertificationDataCount, registerCertificationPost };
