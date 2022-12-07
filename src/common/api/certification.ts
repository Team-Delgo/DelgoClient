import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getMungPlaceList(categoryCode: string) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/mungple/category/${categoryCode}`,
  );
  return data;
}

async function getCertificationDataCount(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';

  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/certification/category/count/${userId}`,
  );
  return data;
}

async function certificationLike(userId: number, certificationId:number, success: (data: AxiosResponse) => void, dispatch: any){
  const accessToken = localStorage.getItem('accessToken') || '';
  await axios.post(`${process.env.REACT_APP_API_URL}/certification/like/${userId}/${certificationId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
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
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function updateCertificationPost(
  data: {
    certificationId: number;
    description: string;
    userId: number;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/certification/modify`, {
      certificationId: data.certificationId,
      description: data.description,
      userId:data.userId,
    });
    console.log(result);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function getCertificationPostsByMain(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/certification/main?userId=${userId}`);
  console.log('data', data);
  return data;
}

async function getCertificationPostAll(pageParam: number, userId: number, pageSize: number, dispatch: any) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/certification/all?currentPage=${pageParam}&pageSize=${pageSize}&userId=${userId}`,
    );
    // console.log(res.data.data);
    const { content, last } = res.data.data;
    return { content, nextPage: pageParam + 1, last };
  } catch (error: any) {
    useErrorHandlers(dispatch, error);
  }
}

async function deleteCertificationPost(
  userId: number,
  certificationId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/certification/delete/${userId}/${certificationId}`,
    );
    success(result);
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
  updateCertificationPost,
  certificationLike,
  deleteCertificationPost,
};
