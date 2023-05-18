import React from "react";

import {useDispatch, useSelector} from "react-redux";

import {selectFilterData, setCategoryId} from '../redux/slices/filterSlice';




const Categories: React.FC = () => {

  const categoriesNames = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const dispatch = useDispatch();

  const categoryId = useSelector(selectFilterData);

  function onChangeCategory(id: number) {
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
