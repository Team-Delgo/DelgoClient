import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

interface SignUpData {
  email: string;
  password: string;
  userName: string;
  phoneNo: string;
  geoCode: number;
  pGeoCode: number;
  petName: string;
  breed: string;
  birthday: string | undefined;
  userSocial: string;
}

async function emailCheck(email: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/auth/email/check`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function nicknameCheck(name: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/auth/name/check`, {
      params: { name },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function signup(info: SignUpData, success: (data: AxiosResponse) => void, dispatch: any) {
  const { userName, email, password, phoneNo, geoCode, pGeoCode, petName, breed, birthday } = info;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/user`, {
      // user: {
      //   name: nickname,
      //   email,
      //   password,
      //   phoneNo: phone,
      // },
      // pet: {
      //   name: pet.name,
      //   birthday: pet.birthday,
      //   size: pet.size,
      //   // weight: 4.3,
      // },

      userName,
      email,
      password,
      geoCode,
      pGeoCode,
      phoneNo,
      petName,
      birthday,
      breed,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function deleteUser(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/account/user/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getRegion(success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/code/geo`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function phoneSendMessage(phone: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/auth/sms?isJoin=false`, {
      params: {
        phoneNo: phone,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function phoneSendMessageForFind(phone: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/auth/sms?isJoin=true`, {
      params: {
        phoneNo: phone,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function phoneCheckNumber(
  data: { number: string; smsId: number },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { number, smsId } = data;
  await axios
    .get(`${process.env.REACT_APP_API_URL}/auth/sms/check`, {
      params: {
        smsId,
        enterNum: number,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function petImageUpload(
  data: { formData: FormData; userId: number },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/photo/upload/profile/${data.userId}`, data.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getPetType() {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/code/breed`);
  return data;
}

export {
  emailCheck,
  nicknameCheck,
  signup,
  deleteUser,
  phoneSendMessageForFind,
  phoneCheckNumber,
  phoneSendMessage,
  petImageUpload,
  getRegion,
  getPetType
};