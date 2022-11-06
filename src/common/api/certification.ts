import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getMungPlaceList(categoryCode: string) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/mungple/data-category?categoryCode=${categoryCode}`,
  );
  return data;
}

async function getCertificationDataCount(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';

  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/certification/category-data-count?userId=${userId}`,
  );
  return data;
}

async function registerCameraCertificationPost(
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
  dispatch: any
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/certification/register/live`, {
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
    useErrorHandlers(dispatch,err);
  }
}

async function registerGalleryCertificationPost(
  data: {
    userId: number;
    categoryCode: string;
    mungpleId: number;
    placeName: string;
    description: string;
    latitude: string;
    longitude: string;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/certification/register/past`, {
      userId: data.userId,
      categoryCode: data.categoryCode,
      mungpleId: data.mungpleId,
      placeName: data.placeName,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      photo: 'null img',
    });
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function registerGalleryCertificationImg(
  formdata: FormData,
  certificationId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/photo/upload/certification/${certificationId}`,
      formdata,
    );
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function updateCertificationPost(
  data: {
    certificationId: number;
    description: string;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/certification/modify`, {
      certificationId: data.certificationId,
      description: data.description,
    });
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch,err);
  }
}

async function getCertificationPostsByMain() {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/certification/data/main`);
  console.log(data);
  return data;
}

async function getCertificationPostAll(pageParam: number, dispatch: any) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/certification/data/all?currentPage=${pageParam}&pageSize=3`,
    );
    console.log(res.data.data);
    const { content, last } = res.data.data;
    return { content, nextPage: pageParam + 1, last };
  } catch (error: any) {
    useErrorHandlers(dispatch, error);
  }
}

export {
  getMungPlaceList,
  getCertificationDataCount,
  registerCameraCertificationPost,
  registerGalleryCertificationPost,
  registerGalleryCertificationImg,
  getCertificationPostsByMain,
  getCertificationPostAll,
  updateCertificationPost
};
