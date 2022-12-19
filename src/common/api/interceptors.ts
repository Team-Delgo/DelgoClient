import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorHandlers } from './useErrorHandlers';

const accessToken = localStorage.getItem('accessToken') || '';
console.log('accessToken 동작',accessToken)

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    authorization_access: accessToken,
  },
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    console.log('error', error);
    const {
      config,
      response: { status },
    } = error;
    console.log('error.response.status', status);
    console.log('config', config);
    if (status === 403) {
      const refreshToken = localStorage.getItem('refreshToken') || '';
      const accessToken = localStorage.getItem('accessToken') || '';
      console.log('refreshToken', refreshToken);  
      console.log('accessToken', accessToken);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/token/reissue`, {
        headers: {
          authorization_refresh: refreshToken,
        },
      });

      console.log('token reissue response',response)

      if (response.data.code === 303) {
        console.log('refresh token 만료');
        throw new Error('token exprired');
      }

      console.log('config', config);
      const originalRequest = config;
      const newAccessToken = response.headers.authorization_access;
      const newRefreshToken = response.headers.authorization_refresh;

      console.log('newAccessToken : ', newAccessToken);
      console.log('newRefreshToken : ', newRefreshToken);

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.authorization_access = newAccessToken;

      return axios(originalRequest);
    }
    return Promise.reject(error);
    // errorHandlers(error);
  },
);

function errorHandlers(error: any) {
  console.log('error', error);
  const dispatch = useDispatch();
  useErrorHandlers(dispatch, error);
}

export default axiosInstance;
