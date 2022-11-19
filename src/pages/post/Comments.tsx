import React from "react"
import { useNavigate } from "react-router-dom";
import "./Comments.scss";
import LeftArrow from "../../common/icons/left-arrow.svg";

function Comments() {
  const navigate = useNavigate();
  return <div className="comments">
    <div className="comments-header">
      <img src={LeftArrow} alt="back" onClick={() => {
        navigate(-1);
      }} aria-hidden="true" />
      <div className="comments-header-title">댓글</div>
    </div>

  </div>
}

export default Comments;