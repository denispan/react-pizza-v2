import React, {useState} from "react";

import {useSelector} from "react-redux";

import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import {SearchContext} from "../App";


const skeletonArray = [...new Array(6)];

function Home() {

  const {categoryId, sort, order}  = useSelector((store) => store.filterSlice);

  const {searchValue} = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //desc - по убыванию
  //asc - по возратсанию


  const filterByCategory = categoryId ? `category=${categoryId}` : '';
  const searchBySortProperty = categoryId ? `&sortBy=${sort.sortProperty}` : `sortBy=${sort.sortProperty}`;


  React.useEffect(() => {
    setIsLoad(false);

    // fetch(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas?page=${currentPage}&limit=4&${filterByCategory}${searchBySortProperty}&order=${order}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((jsonRes) => {
    //     setItems(jsonRes);
    //     setIsLoad(true);
    //   });

    axios
      .get(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas?page=${currentPage}&limit=4&${filterByCategory}${searchBySortProperty}&order=${order}`)
      .then((response) => {
        setItems(response.data);
        setIsLoad(true);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, order, currentPage ]);

  const pizzas = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  ).map((obj) => (<PizzaBlock key={obj.id} {...obj} />));

  const skeletons = skeletonArray.map((_, i) => (<Skeleton key={i}/>));

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoad ? pizzas : skeletons
        }
      </div>
      <Pagination onChangePage={(page) => setCurrentPage(page)}/>
    </div>
  )
}

export default Home;
