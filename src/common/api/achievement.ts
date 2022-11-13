import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

// async function getAchievementList(userId: number) {
//   const accessToken = localStorage.getItem('accessToken') || '';
//   const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/achievements/user-data?userId=${userId}`);
//   console.log(data);
//   return data;
// }

async function getAchievementList(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  const accessToken = localStorage.getItem('accessToken') || '';
  await axios
    .get(`${process.env.REACT_APP_API_URL}/achievements/user?userId=${userId}`)
    .then((data) => {
      console.log(data)
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getAchievementListByMain(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/achievements/user-data?userId=${userId}`);
  console.log(data);
  return data;
}

async function setMainAchievements(
  userId: number,
  firstAchievementsId: number,
  secondAchievementsId: number,
  thirdAchievementsId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/achievements/main/set`, {
      userId,
      first: firstAchievementsId,
      second: secondAchievementsId,
      third: thirdAchievementsId,
    });
    console.log(result);
    success(result);
  } catch (error: any) {
    useErrorHandlers(dispatch, error);
  }
}

export { getAchievementList, setMainAchievements,getAchievementListByMain };
