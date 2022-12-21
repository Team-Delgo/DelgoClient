/* eslint-disable no-nested-ternary */
import React,{useCallback, useEffect, useRef, useState} from 'react';
import { useAnalyticsCustomLogEvent } from '@react-query-firebase/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './CommentsPage.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import { getCommentList, postComment,deleteComment } from '../../common/api/comment';
import { RootState } from '../../redux/store';
import ConfirmBottomSheet from '../../common/dialog/ConfirmBottomSheet';
import ToastPurpleMessage from '../../common/dialog/ToastPurpleMessage';
import { analytics } from "../../index";
import {commentType} from '../../common/types/comment';


interface StateType {
  certificationId: number;
  posterId: number;
}

function CommentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const profile = useSelector((state: RootState) => state.persist.user.pet.image);
  const { certificationId, posterId } = useLocation()?.state as StateType;
  const [enteredInput, setEnteredInput] = useState('');
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const [deleteCommentId, setDeleteCommentId] = useState(-1);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [deleteCommentSuccessToastIsOpen, setDeleteCommentSuccessToastIsOpen] = useState(false);
  const commentEvent = useAnalyticsCustomLogEvent(analytics, 'cert_comment_post');
  const textRef = useRef<any>(null);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (deleteCommentSuccessToastIsOpen) {
      setTimeout(() => {
        closeToastSuccessMessage();
      }, 2000);
    }
  }, [deleteCommentSuccessToastIsOpen]);

  const getComments = useCallback(() => {
    getCommentList(
      certificationId,
      (response: AxiosResponse) => {
        console.log(response.data.data);
        setCommentList(response.data.data);
      },
      dispatch,
    );
  }, []);

  const postCommentOnCert = useCallback(() => {
    commentEvent.mutate();
    setEnteredInput('');
    postComment(
      userId,
      certificationId,
      enteredInput,
      (response: AxiosResponse) => {
        console.log('response', response);
        if (response.data.code === 200) {
          setEnteredInput('');
          getComments();
        }
      },
      dispatch,
    );
  }, [enteredInput]);

  const deleteCommentOnCert = useCallback(() => {
    deleteComment(
      userId,
      deleteCommentId,
      certificationId,
      (response: AxiosResponse) => {
        console.log(response);
        if (response.data.code === 200) {
          oepnToastSuccessMessage();
          closeBottomSheet();
          getComments();
        } else {
          closeBottomSheet();
        }
      },
      dispatch,
    );
  }, [deleteCommentId, certificationId]);

  const handleResizeHeight = useCallback(() => {
    if (textRef.current) {
      if (textRef.current.scrollHeight <= 203) {
        console.log('textRef.current.scrollHeight', textRef.current.scrollHeight);
        textRef.current.style.height = 'auto';
        textRef.current.style.height = `${textRef.current.scrollHeight - 9}px`;
      }
    }
  }, []);

  const oepnToastSuccessMessage = useCallback(() => {
    setDeleteCommentSuccessToastIsOpen(true);
  }, []);

  const closeToastSuccessMessage = useCallback(() => {
    setDeleteCommentSuccessToastIsOpen(false);
  }, []);

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredInput(e.target.value);
  }, []);

  const openBottomSheet = useCallback(
    (commentId: number) => (e: React.MouseEvent) => {
      setBottomSheetIsOpen(true);
      setDeleteCommentId(commentId);
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setBottomSheetIsOpen(false);
  }, []);

  const context = commentList.map((comment: commentType) => {
    return (
      <div className="comment">
        <img src={comment.profile} alt="profile" />
        <div className="comment-content">
          <div className="comment-content-header">
            <div className="comment-content-header-name">{comment.userName}</div>
            <div className="comment-content-header-work">
              <div className="comment-content-header-work-date">{comment.createDt.slice(0, 10)}</div>
              <div
                className="comment-content-header-work-delete"
                aria-hidden="true"
                onClick={
                  userId === posterId
                    ? openBottomSheet(comment.commentId)
                    : userId === comment.userId
                    ? openBottomSheet(comment.commentId)
                    : undefined
                }
                style={userId === posterId ? undefined : userId === comment.userId ? undefined : { visibility: 'hidden' }}
              >
                삭제
              </div>
            </div>
          </div>
          <div className="comment-content-text">{comment.content}</div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="comments">
        <div className="comments-header">
          <img
            src={LeftArrow}
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
            aria-hidden="true"
          />
          <div className="comments-header-title">댓글</div>
        </div>
        <div className="comments-context">{context}</div>
        <div className="comments-post">
          <img src={profile} alt="myprofile" />
          <textarea
            ref={textRef}
            value={enteredInput}
            onInput={handleResizeHeight}
            onAbort={handleResizeHeight}
            onChange={inputChangeHandler}
            placeholder="댓글 남기기..."
            className="comments-post-input"
          />
          <div
            aria-hidden="true"
            onClick={enteredInput.length > 0 ? postCommentOnCert : undefined}
            className={enteredInput.length > 0 ? 'comments-post-button' : 'comments-post-button-disabled'}
          >
            완료
          </div>
        </div>
      </div>
      <ConfirmBottomSheet
        text="댓글을 삭제하실건가요?"
        description="지우면 다시 볼 수 없어요"
        cancelText="취소"
        acceptText="삭제"
        acceptButtonHandler={deleteCommentOnCert}
        cancelButtonHandler={closeBottomSheet}
        bottomSheetIsOpen={bottomSheetIsOpen}
      />
      {deleteCommentSuccessToastIsOpen && <ToastPurpleMessage message="댓글이 삭제 되었습니다." />}
    </>
  );
}

export default CommentsPage;
