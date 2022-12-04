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
  petSize: string;
  birthday: string | undefined;
  userSocial: string;
}

async function emailCheck(email: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/emailCheck`, {
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
    .get(`${process.env.REACT_APP_API_URL}/nameCheck`, {
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
  const { userName, email, password, phoneNo, geoCode, pGeoCode, petName, petSize, birthday } = info;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/signup`, {
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
      petSize,
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
    .delete(`${process.env.REACT_APP_API_URL}/user/${userId}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function getRegion(success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/code/geo-data`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function phoneSendMessage(phone: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/phoneNoAuth`, {
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
    .get(`${process.env.REACT_APP_API_URL}/phoneNoCheck`, {
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
    .get(`${process.env.REACT_APP_API_URL}/authRandNum`, {
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

export {
  emailCheck,
  nicknameCheck,
  signup,
  deleteUser,
  phoneSendMessageForFind,
  phoneCheckNumber,
  phoneSendMessage,
  petImageUpload,
  getRegion
};
