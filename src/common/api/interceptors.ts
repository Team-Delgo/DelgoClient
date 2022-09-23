import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorHandlers } from './useErrorHandlers';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('error', error);
    const {
      config,
      response: { status },
    } = error;
    console.log('error.response.status', error.response.status);
    console.log('config', config);
    if (status === 403) {
      const refreshToken = localStorage.getItem('refreshToken') || '';
      const accessToken = localStorage.getItem('accessToken') || '';
      console.log('refreshToken', refreshToken);
      console.log('accessToken', accessToken);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokenReissue`, {
        headers: {
          Authorization_Refresh: refreshToken,
        },
      });
      console.log('response', response);
      console.log('config', config);
      const originalRequest = config;
      const newAccessToken = response.headers.authorization_access;
      const newRefreshToken = response.headers.authorization_refresh;

      console.log('newAccessToken : ', newAccessToken);
      console.log('newRefreshToken : ', newRefreshToken);

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.Authorization_Access = newAccessToken;

      return axiosInstance(originalRequest);
    }
    // return Promise.reject(error);
    errorHandlers(error);
  },
);

function errorHandlers(error: any) {
  console.log('error', error);
  const dispatch = useDispatch();
  useErrorHandlers(dispatch, error);
}

export default axiosInstance;
