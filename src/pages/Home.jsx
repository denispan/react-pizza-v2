import React, {useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/slices/filterSlice'

import {SearchContext} from "../App";

function Home() {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  const {searchValue} = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [categoryId, setCategoryId ] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
    fetch(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas?page=${currentPage}&limit=4&${filterByCategory}${searchBySortProperty}&order=${sortOrder}`)
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setItems(jsonRes);
        setIsLoad(true);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, currentPage ]);

  const pizzas = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  ).map((obj) => (<PizzaBlock key={obj.id} {...obj} />));

  const skeletons = skeletonArray.map((_, i) => (<Skeleton key={i}/>));

  return (
    <div className="container">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  )
}

export default Home;
