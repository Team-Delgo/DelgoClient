import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import "./AlertConfirm.scss";

function AlertConfirmOne(props: { text: string, buttonHandler: () => void }) {
  const { text, buttonHandler } = props;
  const [unmount, setUnmount] = useState(false);
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y:scroll;
      width:100%
    `;
    return () => {
      
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, []);

  const modalUnmount = () => {
    setUnmount(true);
    setTimeout(buttonHandler, 400);
  };

  const el = document.getElementById('modal') as Element;

  return createPortal(<div className={classNames('alertConfirm-bg', { unmount })}>
    <div className={classNames('alertConfirm-box', { unmount })}>
      <div className='alertConfirm-text'>{text}</div>
      <div className='alertConfirm-wrapper'>
        <button type='button' className='alertConfirm-button' onClick={modalUnmount}>확인</button>
      </div>
    </div>
  </div>, el);
};

export default React.memo(AlertConfirmOne);