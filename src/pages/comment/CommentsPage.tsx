/* eslint-disable no-nested-ternary */
import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './CommentsPage.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import { getCommentList, postComment,deleteComment } from '../../common/api/comment';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import { RootState } from '../../redux/store';
import {RECORD_PATH} from '../../common/constants/path.const'

interface Comment {
  certificationId: number;
  content: string;
  isReply: boolean;
  createDt: string;
  profile: string;
  userId: number;
  userName: string;
  commentId: number;
}

interface StateType {
  certificationId: number;
  posterId: number;
}

function CommentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const profile = useSelector((state: RootState) => state.persist.user.pet.image);
  const {certificationId,posterId} = useLocation()?.state as StateType
  const [enteredInput, setEnteredInput] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [commentDisabled, setCommentDisabled] = useState(false);
  const [deleteCommentId,setDeleteCommentId] = useState(-1)

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    getCommentList(
      certificationId,
      (response: AxiosResponse) => {
        console.log(response.data.data);
        setCommentList(response.data.data);
      },
      dispatch,
    );
  };

  const postCommentOnCert = () => {
    setEnteredInput('');
    setCommentDisabled(true)
    postComment(
      userId,
      certificationId,
      enteredInput,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setEnteredInput('');
          getComments();
        }
      },
      dispatch,
    );
  };

  const deleteCommentOnCert = () => {
    deleteComment(
      userId,
      deleteCommentId,
      certificationId,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          getComments();
          closeDeleteAlert();
        }
      },
      dispatch,
    );
  };

  const inputChangeHandler = (e: any) => {
    setEnteredInput(e.target.value);
  };

  const openDeleteAlert = (commentId: number) => (e: React.MouseEvent) => {
    setShowDeleteAlert(true);
    setDeleteCommentId(commentId);
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
  };

  const context = commentList.map((comment: Comment) => {
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
                    ? openDeleteAlert(comment.commentId)
                    : userId === comment.userId
                    ? openDeleteAlert(comment.commentId)
                    : undefined
                }
                style={
                  userId === posterId ? undefined : userId === comment.userId ? undefined : { visibility: 'hidden' }
                }
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
            value={enteredInput}
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
      {showDeleteAlert && (
        <AlertConfirm
          text="댓글을 삭제 하시겠습니까?"
          buttonText="삭제"
          noButtonHandler={closeDeleteAlert}
          yesButtonHandler={deleteCommentOnCert}
        />
      )}
    </>
  );
}

export default CommentsPage;
