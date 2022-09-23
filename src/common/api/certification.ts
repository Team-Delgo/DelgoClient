import { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

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
  console.log(data)
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.post(`/certification/register`, {
    userId: data.userId,
    categoryCode: data.categoryCode,
    mungpleId: data.mungpleId,
    placeName: data.placeName,
    description: data.description,
    latitude: data.latitude,
    longitude: data.longitude,
    photo: data.photo,
  });
  success(result);
}

export { registerCertificationPost};
