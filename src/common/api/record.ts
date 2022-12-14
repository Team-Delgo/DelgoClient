import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getMapData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axiosInstance
    .get(`${process.env.REACT_APP_API_URL}/map/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getCalendarData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axiosInstance
    .get(`${process.env.REACT_APP_API_URL}/calendar/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getCategoryCount(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/certification/category/count/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getPhotoData(
  userId: number,
  categoryCode: string,
  currentPage: number,
  pageSize: number,
  isDesc: boolean,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  await axios
    .get(
      `${process.env.REACT_APP_API_URL}/certification/category?categoryCode=${categoryCode}&userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}&isDesc=${isDesc}`,
    )
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}



export { getMapData, getCalendarData, getPhotoData, getCategoryCount };
