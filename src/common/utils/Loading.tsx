import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Ring} from 'react-css-spinners'
import "./Loading.scss";

function Loading() {
  return (
    <div className="loader">
      <Ring color="#FF9162" size={60} />
    </div>
  );
}

export default Loading;