import React, {useState} from "react";

const categoriesNames = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
]

function Categories() {

  const [activeCategory, setActiveCategory ] = useState(0);

  function setCategory(index) {
    setActiveCategory(index);
  }

  return (
    <div className="categories">
      <ul>
        {
          categoriesNames.map( (value, index) => (
            (<li onClick={() => setCategory(index)} className={activeCategory === index ? "active" : ''}>{value}</li>)
          ))
        }
      </ul>
    </div>
  );
}
export default Categories;
