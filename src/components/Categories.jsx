import React from "react";

import {useDispatch, useSelector} from "react-redux";

import {setCategoryId} from "../redux/slices/filterSlice";


const categoriesNames = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
];

function Categories() {

  const dispatch = useDispatch();

  const categoryId = useSelector((store => store.filterSlice.categoryId));

  function onChangeCategory(id) {
    dispatch(setCategoryId(id));
  }

  return (
    <div className="categories">
      <ul>
        {
          categoriesNames.map( (value, index) => (
            (<li key={index} onClick={() => onChangeCategory(index)} className={categoryId === index ? "active" : ''}>{value}</li>)
          ))
        }
      </ul>
    </div>
  );
}
export default Categories;
