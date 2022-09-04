import React from 'react'
import './BottomButton.scss';

function BottomButton(props: { text: string }) {
  const { text } = props;
  return (
    <div className="bottom-button">{text}</div>
  )
}

export default BottomButton