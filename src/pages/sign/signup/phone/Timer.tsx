import React, { useEffect, useState } from 'react';

function Timer(props: { isResend: boolean; resendfunc: () => void; setInValid: () => void }) {
  const { isResend, resendfunc, setInValid } = props;
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (isResend) {
      resendfunc();
      setMinutes(2);
      setSeconds(59);

      return;
    }

    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setInValid();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, isResend]);

  return (
    <div>
      <span>0{minutes}:</span>
      <span>{seconds >= 10 ? seconds : `0${seconds}`}</span>
    </div>
  );
}

export default Timer;
