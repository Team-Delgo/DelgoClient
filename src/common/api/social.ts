import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

async function setAccessCode(code: string | null, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/access-code/kakao/${code}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function oAuthSignup(data: {email:string,userName:string,phoneNo:string,petName:string,petSize:string,birthday:string|undefined,userSocial:string} , success: (data: AxiosResponse) => void, dispatch: any) {
  const {email,userName,phoneNo,petName,petSize,birthday,userSocial} = data;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/oAuthSignup `,{
      userName,
      phoneNo,
      petName,
      petSize,
      birthday,
      userSocial,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function setStateCode(
  data: { code: string | null; state: string | null },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { code, state } = data;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/naver/state-code/${state}/${code}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function appleSendToken(token:string|null ,success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/apple/id_token/${token}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { setAccessCode, oAuthSignup, setStateCode, appleSendToken };


