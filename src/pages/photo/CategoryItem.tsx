import React from "react"
import classNames from "classnames";


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