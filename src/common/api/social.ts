import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

function setAccessCode(code: string | null, success: (data: AxiosResponse) => void, navigate: () => void, dispatch: any) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/oauth/kakao/${code}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      navigate();
      useErrorHandlers(dispatch, error);
    });
}

function oAuthSignup(
  data: {
    email: string;
    userName: string;
    phoneNo: string;
    geoCode: number;
    pGeoCode: number;
    petName: string;
    breed: string;
    birthday: string | undefined;
    userSocial: string;
    appleUniqueNo: string | undefined;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, geoCode, pGeoCode, userName, phoneNo, petName, breed, birthday, userSocial, appleUniqueNo } = data;
  axios
    .post(`${process.env.REACT_APP_API_URL}/user/oauth `, {
      email,
      userName,
      phoneNo,
      geoCode: geoCode.toString(),
      pGeoCode: pGeoCode.toString(),
      petName,
      breed,
      birthday,
      userSocial,
      appleUniqueNo
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

function setStateCode(
  data: { code: string | null; state: string | null },
  success: (data: AxiosResponse) => void,
  navigate: () => void,
  dispatch: any,
) {
  const { code, state } = data;
  axios
    .post(`${process.env.REACT_APP_API_URL}/oauth/naver/${state}/${code}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      console.log(1);
      navigate();
      useErrorHandlers(dispatch, error);
    });
}

function appleSendToken(token: string | null, success: (data: AxiosResponse) => void, dispatch: any) {
  axios
    .post(`${process.env.REACT_APP_API_URL}/oauth/apple/${token}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { setAccessCode, oAuthSignup, setStateCode, appleSendToken };
