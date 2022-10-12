import React, { DOMAttributes, UIEventHandler } from 'react';
import './DetailTerm.scss';
import term from './TermContents';

function DetailTerm(props: { id: number }) {
  const { id } = props;
  const keyTyped = id as keyof typeof term;

  return (
    <div className="wrapper">
      <p className="title">{term[keyTyped].main}</p>
      <p className="description">{term[keyTyped].description}</p>
    </div>
  );
}

export default DetailTerm;
