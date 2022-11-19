import React from 'react'
import LeftArrow from '../../common/icons/left-arrow.svg';

function Comments() {
  return <div className='comments'>
    <div className='comments-header'>
      <img src={LeftArrow} alt="left-arrow"/>
      <h1>댓글</h1>
    </div>
  </div>
};

export default Comments;