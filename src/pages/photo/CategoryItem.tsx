import React from "react"
import classNames from "classnames";

export const categoryCode: categoryType = {
  산책: 'CA0001',
  카페: 'CA0002',
  식당: 'CA0003',
  목욕: 'CA0004',
  미용: 'CA0005',
  병원: 'CA0006',
  기타: 'CA9999',
};

export interface categoryType {
  산책: string;
  카페: string;
  식당: string;
  목욕: string;
  미용: string;
  병원: string;
  기타: string;
  [prop: string]: any;
}

function CategoryItem(
  categoryCode: string,
  categoryName: string,
  icon: string,
  setCategory: React.Dispatch<any>,
  setCategoryTab: React.Dispatch<React.SetStateAction<string>>,
  moveToCategoryRightScroll: () => void,
  cateogory: any,
  categoryCount: number,
) {
  return (
    <div
      aria-hidden="true"
      className="photo-category-button item"
      onClick={() => {
        setCategory(categoryCode);
        setCategoryTab(categoryName);
        moveToCategoryRightScroll();
      }}
    >
      <img className={classNames(categoryCode, { selected: cateogory === categoryCode })} src={icon} alt="icons" />
      <span>{categoryCount}회</span>
    </div>
  );
}

export default CategoryItem;