import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorHandlers } from './useErrorHandlers';

const accessToken = localStorage.getItem('accessToken') || '';
console.log('accessToken 동작',accessToken)

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  // headers: {
  //   Authorization_Access: accessToken,
  // },
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
          Authorization_Refresh: refreshToken,
        },
      });

      console.log('response',response)

      if (response.data.code === 303) {
        console.log('refresh token 만료');
        throw new Error('token exprired');
      }

      console.log('response', response);
      console.log('config', config);
      const originalRequest = config;
      const newAccessToken = response.headers.Authorization_Access;
      const newRefreshToken = response.headers.Authorization_Refresh;

      console.log('newAccessToken : ', newAccessToken);
      console.log('newRefreshToken : ', newRefreshToken);

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.Authorization_Access = newAccessToken;

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
