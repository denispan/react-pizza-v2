import React from "react";

import debounce from "lodash.debounce";

import {setSearchValue} from '../../redux/slices/filterSlice';

import styles from "./Search.module.scss";
import {useDispatch} from 'react-redux';


function Search() {
  const dispatch = useDispatch()

  const [searchValueLocal, setSearchValueLocal] = React.useState('');

  const inputSearchRef = React.useRef();

  const onClearInput = () => {
    dispatch(setSearchValue(''));
    setSearchValueLocal('');
    inputSearchRef.current.focus();
  }

  const updateSearchRequest = React.useCallback(
    debounce(
    (str) => {dispatch(setSearchValue(str));}, 500),
    []);

  const onChangeInputValue = (str) => {
    setSearchValueLocal(str);
    updateSearchRequest(str);
  }

  return (
    <form className={styles.searchForm}>
      <input ref={inputSearchRef} onChange={(evt => onChangeInputValue(evt.target.value))} className={styles.searchForm__input} placeholder='Поиск пицц...' value={searchValueLocal}/>
      <svg className={styles.searchForm__icon} enableBackground="new 0 0 32 32" id="Editable-line" version="1.1"
           viewBox="0 0 32 32"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" fill="none" id="XMLID_42_" r="9" stroke="#000000" strokeLinecap="round"
                strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <line id="XMLID_44_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"
              strokeMiterlimit="10" strokeWidth="2" x1="27" x2="20.366" y1="27" y2="20.366"/>
      </svg>
      {
        searchValueLocal &&
        <button onClick={onClearInput} className={styles.searchForm__button} type="button">
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="currentColor"/>
          </svg>
        </button>
      }
    </form>

  )
}

export default Search;
