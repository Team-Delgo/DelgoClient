import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { DELGO_REWARD_URL } from '../constants/url.cosnt';

async function getMapData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/map/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getCalendarData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/calendar/user?userId=${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getCategoryCount(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/certification/category/count?userId=${userId}`)
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
  isDesc: number,
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
