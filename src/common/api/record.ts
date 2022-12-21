import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

function getMapData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .get(`/map/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function getCalendarData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .get(`/calendar/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function getCategoryCount(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  axiosInstance
    .get(`/certification/category/count/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function getPhotoData(
  userId: number,
  categoryCode: string,
  currentPage: number,
  pageSize: number,
  isDesc: boolean,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  axiosInstance
    .get(
      `/certification/category?categoryCode=${categoryCode}&userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}&isDesc=${isDesc}`,
    )
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { getMapData, getCalendarData, getPhotoData, getCategoryCount };
