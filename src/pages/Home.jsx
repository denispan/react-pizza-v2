import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import {fetchPizzas} from "../redux/slices/pizzasSlice";

import {useNavigate} from "react-router-dom";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import {SearchContext} from "../App";

const skeletonArray = [...new Array(6)];

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {items, status} = useSelector((store) => store.pizzasSlice);

  const {categoryId, sort, order, currentPage} = useSelector((store) => store.filterSlice);

  const {searchValue} = React.useContext(SearchContext);

  const onChangeCurrentPage = (page) => {
    dispatch(setCurrentPage(page));
  }

  //const [isLoad, setIsLoad] = React.useState(false);

  //desc - по убыванию
  //asc - по возратсанию

  const filterByCategory = categoryId ? `category=${categoryId}` : '';
  const searchBySortProperty = categoryId ? `&sortBy=${sort.sortProperty}` : `sortBy=${sort.sortProperty}`;

  const getPizzas = async () => {
    dispatch(fetchPizzas({
      currentPage,
      filterByCategory,
      searchBySortProperty,
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
  ).map((obj) => (<PizzaBlock key={obj.id} {...obj} />));

  const skeletons = skeletonArray.map((_, i) => (<Skeleton key={i}/>));

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status === 'loading' ? pizzas : skeletons
        }
      </div>
      <Pagination onChangePage={onChangeCurrentPage}/>
    </div>
  )
}

export default Home;
