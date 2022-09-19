import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import {DELGO_REWARD_URL} from '../constants/url.cosnt';


async function getMapData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${DELGO_REWARD_URL}/map/data?userId=${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getCalendarData(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${DELGO_REWARD_URL}/calendar/data?userId=${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export {getMapData, getCalendarData};