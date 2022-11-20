import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getCommentList(certificationId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/comment?certificationId=${certificationId}`);
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

async function postComment(
  userId: number,
  certificationId: number,
  content: string,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/comment`, {
      userId,
      certificationId,
      isReply: false,
      content,
    });
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

async function deleteComment(userId: number, commentId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/comment/delete/${commentId}/${userId}`);
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

export { getCommentList, postComment, deleteComment };
