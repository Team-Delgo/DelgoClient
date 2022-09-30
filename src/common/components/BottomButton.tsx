import React from 'react';
import './BottomButton.scss';

interface BottomButtonProps {
  text: string;
  [prop: string]: string;
}

function BottomButton({ text, color = '#474747' }: BottomButtonProps) {
  return (
    <div className="bottom-button" style={{ backgroundColor: color }}>
      {text}
    </div>
  );
}

export default BottomButton;
