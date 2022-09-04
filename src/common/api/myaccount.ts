import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

async function getMyAccountDataList(userId: number) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/myAccount`, {
    params: { userId },
  });
  console.log(data);
  return data;
}

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; size: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, name, birthday, size } = data;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/changePetInfo`, {
      email,
      name,
      birthday,
      size,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/changePassword`, {
      email,
      newPassword: password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { getMyAccountDataList, changePetInfo, changePassword };
