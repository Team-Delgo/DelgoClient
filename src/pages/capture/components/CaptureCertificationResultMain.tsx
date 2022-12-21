import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { categoryIcon } from '../../../common/types/category';

function CaptureResultMain() {
  const { img, title, content, categoryKo, address } = useSelector((state: RootState) => state.persist.upload);

  return (
    <main className="capture-img-result-main">
      <img className="capture-img" src={img} alt="caputeImg" />
      <header className="capture-img-result-main-header">
        <div className="capture-img-result-main-header-place">
          <div className="capture-img-result-main-header-place-name">{title}</div>
          <div className="capture-img-result-main-header-place-address">{address}</div>
        </div>
        <img src={categoryIcon[categoryKo]} alt="category-img" width={48} height={48} />
      </header>
      <body className="capture-img-result-main-body">{content}</body>
    </main>
  );
}

export default CaptureResultMain;
