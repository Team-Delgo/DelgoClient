import classNames from 'classnames';
import React from 'react';
import './MungpleToggle.scss';

function MungpleToggle(props: { selected: boolean, on:()=>void, off:()=>void }) {
  const { selected,on, off } = props;
  return (
    <div className="mungpletoggle">
      <div className={classNames('mungpletoggle-top', { selected })} aria-hidden="true" onClick={() => {off()}}>
        기록
      </div>
      <div
        className={classNames('mungpletoggle-bottom', { selected: !selected })}
        aria-hidden="true"
        onClick={() => {on()}}
      >
        멍플
      </div>
    </div>
  );
}

export default MungpleToggle;
