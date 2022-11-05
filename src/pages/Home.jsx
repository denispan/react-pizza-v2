import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const skeletonArray = [...new Array(6)];

  React.useEffect(() => {
    fetch('https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas')
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setItems(jsonRes);
        setIsLoad(true);
      })
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
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
    </>
  )
}

export default Home;
