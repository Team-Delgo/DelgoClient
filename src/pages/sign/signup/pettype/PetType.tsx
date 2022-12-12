/* eslint-disable array-callback-return */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPetType } from '../../../../common/api/signup';
import { useErrorHandlers } from '../../../../common/api/useErrorHandlers';
import { CACHE_TIME, GET_PET_TYPE_DATA_LIST, STALE_TIME } from '../../../../common/constants/queryKey.const';
import { ReactComponent as Arrow } from '../../../../common/icons/left-arrow.svg';
import MagnifyingGlass from '../../../../common/icons/magnifying-glass.svg';
import Check from '../../../../common/icons/place-check.svg';
import './PetType.scss';

interface petType {
  code: string;
  codeDesc: string;
  codeName: string;
  n_code: null;
  n_pCode: null;
  pcode: string;
  registDt: string;
  type: string;
}

function PetType() {
  const navigation = useNavigate();
  const [searchPetTypeName, setSearchPetTypeName] = useState('');
  const [checkedPetTypeId, setCheckedPetTypeId] = useState('');
  const dispatch = useDispatch();

  const { isLoading: getCertificationPostsByMainIsLoading, data: certificationPostsDataList } = useQuery(
    GET_PET_TYPE_DATA_LIST,
    () => getPetType(),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );


  const wirtePetTypeName = useCallback((e) => {
    setSearchPetTypeName(e.target.value.trim());
  }, []);

  const selectPetType = (pet: petType) => (event: React.MouseEvent) => {
    setCheckedPetTypeId(pet.code);
  };

  if (getCertificationPostsByMainIsLoading) {
    return <div className="login"> &nbsp;</div>;
  }

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
      <div className="pet-type-search-result-container">
        {certificationPostsDataList?.data?.map((pet: petType) => {
          if (searchPetTypeName.length > 0) {
            if (pet.codeName.includes(searchPetTypeName)) {
              return (
                <div className="pet-type-search-result" aria-hidden="true" onClick={selectPetType(pet)}>
                  <div
                    className={
                      checkedPetTypeId === pet.code ? 'pet-type-search-result-active-name' : 'pet-type-search-result-name'
                    }
                  >
                    {pet.codeName}
                  </div>
                  {checkedPetTypeId === pet.code ? (
                    <img className="pet-type-search-result-check" src={Check} alt="category-img" />
                  ) : null}
                </div>
              );
            }
          }
        })}
      </div>
      <button
        type="button"
        disabled={checkedPetTypeId === ''}
        className={classNames('login-button', { active: checkedPetTypeId !== '' })}
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
