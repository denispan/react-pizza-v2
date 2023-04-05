import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {selectFilterData, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import {fetchPizzas, selectPizzasSlice} from "../redux/slices/pizzasSlice";

import {Link, useNavigate} from 'react-router-dom';

import qs from "qs";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const skeletonArray = [...new Array(4)];

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {items, status} = useSelector(selectPizzasSlice);

  const {categoryId, sort, order, currentPage, searchValue} = useSelector(selectFilterData);

  const onChangeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  }


  //desc - по убыванию
  //asc - по возратсанию

  const getPizzas = async () => {
    dispatch(fetchPizzas({
      currentPage,
      categoryId,
      sort,
      order
    }));
  };

  //при первом рендере не вшиваем параметры в адресную строку. если параметры изменились то
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        order,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, order, currentPage]);

  //если был первый рендер, то параметры из адресной строки сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sort);

      dispatch(
        setFilters({
          ...params,
          sort
        }),
      );

      isSearch.current = true;
    }
  }, [])

  //если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, order, currentPage]);

  const pizzas = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  ).map((obj) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  const skeletons = skeletonArray.map((_, i) => (<Skeleton key={i}/>));

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      { status === "error" ?
        <div className="content__error">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось загрузить пиццы. Попробуйте повторить загрузку позже</p>
        </div>
        :
        <div className="content__items">
          { status === 'success' ? pizzas : skeletons }
        </div>
      }
      <Pagination onChangePage={onChangeCurrentPage}/>
    </div>
  )
}

export default Home;
