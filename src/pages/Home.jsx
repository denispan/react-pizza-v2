import React, {useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {

  const [items, setItems] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [categoryId, setCategoryId ] = useState(0);
  const [sortType, setSortType ] = useState({
    sortName: 'популярности',
    sortProperty: 'rating'
  });
  const [sortOrder, setSortOrder] = useState('asc');

  //desc - по убыванию
  //asc - по возратсанию

  const skeletonArray = [...new Array(6)];

  const filterByCategory = categoryId ? `category=${categoryId}` : '';
  const searchBySortProperty = categoryId ? `&sortBy=${sortType.sortProperty}` : `sortBy=${sortType.sortProperty}`;

  React.useEffect(() => {
    setIsLoad(false);
    fetch(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas?${filterByCategory}${searchBySortProperty}&order=${sortOrder}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setItems(jsonRes);
        setIsLoad(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
        <Sort sortType={sortType} onChangeSort={(obj) => setSortType(obj)} sortOrder={sortOrder} onChangeSortOrder={(order) => setSortOrder(order)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoad ?
            items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            )) :
            skeletonArray.map((_, i) => (
              <Skeleton key={i}/>
            ))
        }
      </div>
    </div>
  )
}

export default Home;
