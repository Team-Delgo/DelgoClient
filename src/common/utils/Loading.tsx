import React from 'react';
import { Ring} from 'react-css-spinners'
import "./Loading.scss";

function Loading() {
  return (
    <div className="loader">
      <Ring color="#aa98ec" size={60} />
    </div>
  );
}

export default React.memo(Loading);