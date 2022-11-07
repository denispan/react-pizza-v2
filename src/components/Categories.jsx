import React from "react";

const categoriesNames = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
];

function Categories({categoryId, onChangeCategory}) {

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
