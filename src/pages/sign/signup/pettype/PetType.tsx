/* eslint-disable array-callback-return */
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import MagnifyingGlass from '../../../../common/icons/magnifying-glass.svg';
import Check from '../../../../common/icons/place-check.svg';
import './PetType.scss';

const 강아지종류 = [
  { name: '시츄', id: '1', active: false },
  { name: '시츄2', id: '2', active: false },
];

function PetType() {
  const navigation = useNavigate();
  const [searchPetTypeName, setSearchPetTypeName] = useState('');
  const [checkedPetTypeId, setCheckedPetTypeId] = useState(-1);

  const wirtePetTypeName = useCallback((e) => {
    setSearchPetTypeName(e.target.value.trim());

    if (e.target.value.trim() === '') {
      setCheckedPetTypeId(-1);
    }
  }, []);

  const selectPetType = (dog: any) => (event: React.MouseEvent) => {
    setCheckedPetTypeId(dog.id);
  };

  return (
    <div className="login">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={() => {
          setTimeout(() => {
            navigation(-1);
          }, 200);
        }}
      >
        <Arrow />
      </div>
      <header className="login-header">대표 강아지 정보</header>
      <div className="pet-type-search">
        <input type="text" className="pet-type-search-name" placeholder="강아지 종류" onChange={wirtePetTypeName} />
        <img className="pet-type-search-magnifying-glass-img" src={MagnifyingGlass} alt="magnifying-glass-img" />
      </div>
      {강아지종류.map((dog: any) => {
        if (searchPetTypeName.length > 0) {
          if (dog.name.includes(searchPetTypeName)) {
            return (
              <div className="pet-type-search-result" aria-hidden="true" onClick={selectPetType(dog)}>
                <div
                  className={
                    checkedPetTypeId === dog.id ? 'pet-type-search-result-active-name' : 'pet-type-search-result-name'
                  }
                >
                  {dog.name}
                </div>
                {checkedPetTypeId === dog.id ? (
                  <img className="pet-type-search-result-check" src={Check} alt="category-img" />
                ) : null}
              </div>
            );
          }
        }
      })}
      <button
        type="button"
        disabled={checkedPetTypeId === -1}
        className={classNames('login-button', { active: checkedPetTypeId !== -1 })}
        // onClick={() => {
        //   setTimeout(() => {
        //     submitHandler();
        //   }, 300);
        // }}
      >
        저장하기
      </button>
    </div>
  );
}

export default PetType;
