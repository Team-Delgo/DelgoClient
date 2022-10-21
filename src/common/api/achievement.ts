import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function getAchievementList(userId: number) {
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
) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/achievements/set-main`, {
      userId,
      first: firstAchievementsId,
      second: secondAchievementsId,
      third: thirdAchievementsId,
    });
    console.log(result);
    success(result);
  } catch (err: any) {
    console.log(err);
  }
}

export { getAchievementList, setMainAchievements };
