import React from 'react';
import './ToastPurpleMessage.scss';

function ToastPurpleMessage(props: { message: string }) {
  const { message } = props;
  return (
    <div className="toast-success-message">
      <p className="toast-success-message-text">{message}</p>
    </div>
  );
}

export default React.memo(ToastPurpleMessage);
