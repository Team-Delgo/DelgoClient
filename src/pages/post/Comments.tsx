import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Comments.scss';
import LeftArrow from '../../common/icons/left-arrow.svg';
import { getCommentList, postComment } from '../../common/api/certification';

interface Comment{
  certificationId: number;
  content:string;
  isReply:boolean;
  createDt:string;
  profile:string;
  userId:number;
  userName:string;
}

function Comments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state:any) => state.persist.user.user.id);
  const profile = useSelector((state:any)=>state.persist.user.pet.image)
  console.log(userId);
  const certificationId = useLocation().state as number;
  const [enteredInput, setEnteredInput] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const getComments =  () => {
    getCommentList(certificationId, (response: AxiosResponse) => {
      console.log(response);
      setCommentList(response.data.data);
    }, dispatch);

  };

  const postCommentOnCert = () => {
    postComment(userId, certificationId, enteredInput, (response:AxiosResponse)=>{
      console.log(response);
    }, dispatch);
  }

  const inputChangeHandler = (e:any) => {
    setEnteredInput(e.target.value);
  };

  useEffect(()=>{
    getComments();
  },[]);

  const context = commentList.map((e:Comment)=>{
    return <div className='comment'>
      <img src={e.profile} alt="profile"/>
      <div className='comment-content'>
        <div className='comment-content-header'>
          <div className='comment-content-header-name'>{e.userName}</div>
          <div className='comment-content-header-date'>{e.createDt.slice(0,10)}</div>
        </div>
        <div className='comment-content-text'>
          {e.content}
        </div>
      </div>
    </div>
  })

  return (
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
      <div className='comments-context'>
      {context}
      </div>
      <div className='comments-post'>
        <img src={profile} alt="myprofile"/>
        <input value={enteredInput} onChange={inputChangeHandler} placeholder='댓글 남기기...' className='comments-post-input'/>
        <div aria-hidden="true" onClick={postCommentOnCert} className='comment-post-button'>남기기</div>
      </div>
    </div>
  );
}

export default Comments;
