import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function getCommentList(certificationId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axiosInstance.get(`/comment?certificationId=${certificationId}`);
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
    const result = await axiosInstance.post(`/comment`, {
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

async function deleteComment(
  userId: number,
  commentId: number,
  certificationId: number,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axiosInstance.delete(
      `/comment/${commentId}/${userId}/${certificationId}`,
    );
    success(result);
  } catch (error: any | AxiosError) {
    useErrorHandlers(dispatch, error);
  }
}

export { getCommentList, postComment, deleteComment };
