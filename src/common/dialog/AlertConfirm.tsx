import React, { useEffect } from 'react'
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import "./AlertConfirm.scss";
import { useState } from 'react';

function AlertConfirm(props: { text: string, buttonText: string, yesButtonHandler: () => void, noButtonHandler: () => void }) {
  const [unmount, setUnmount] = useState(false);
  const { text, buttonText, yesButtonHandler, noButtonHandler } = props;
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

  const yesUnmount = () => {
    setTimeout(() => {
      setUnmount(true);
      setTimeout(yesButtonHandler, 400);
    }, 100)
  };

  const noUnmount = () => {
    setTimeout(() => {
      setUnmount(true);
      setTimeout(noButtonHandler, 400);
    }, 100)
  };

  const el = document.getElementById('modal') as Element;

  return createPortal(<div className={classNames('alertConfirm-bg', { unmount })}>
    <div className={classNames('alertConfirm-box', { unmount })}>
      <div className='alertConfirm-text'>{text}</div>
      <div className='alertConfirm-wrapper'>
        <button type='button' className='alertConfirm-button' onClick={noUnmount}>취소</button>
        <button type='button' className='alertConfirm-button' onClick={yesUnmount}>{buttonText}</button>
      </div>
    </div>
  </div>, el);
};

export default React.memo(AlertConfirm);