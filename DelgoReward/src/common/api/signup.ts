import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  pet: { name: string; birthday: string | undefined; size: string };
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
  const { nickname, email, password, phone, pet } = info;
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

      userName: nickname,
      email,
      password,
      phoneNo: phone,
      petName: pet.name,
      birthday: pet.birthday,
      petSize: pet.size,
      // weight: 4.3,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function deleteUser(userId: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/deleteUser/${userId}`)
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
    .post(`${process.env.REACT_APP_API_URL}/photo/upload/petProfile/${data.userId}`, data.formData, {
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
};
