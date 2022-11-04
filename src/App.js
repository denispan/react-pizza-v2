import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas')
      .then((response) => {
        return response.json();
      })
      .then((jsonRes) => {
        setItems(jsonRes);
      })
  }, [])



  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map(obj => (
                <PizzaBlock key={obj.id} {...obj}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
