import './ToastMessage.scss';
import React from 'react';

function ToastMessage(props: { message: string }) {
  const { message } = props;

  return (
    <div className="toastmessage">
      <p className="toastmessage-text">{message}</p>
    </div>
  );
}
export default React.memo(ToastMessage);
