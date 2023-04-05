import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {

  const [pizza, setPizza] = React.useState({});
  const { id } = useParams();

  useEffect(() => {

    async function fetchPizza () {
      try {
        const {data} = await axios.get(`https://6364ea7ef711cb49d1efed68.mockapi.io/pizzas/${id}`);
        setPizza(data);
      } catch (e) {
        alert('ошибка загрузки')
      }
    }

    fetchPizza();

  }, [])

  if (!pizza) {
    return (
        <div className="container">
          <p>Загрузка...</p>
        </div>
      )
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza"/>
      <h2>{ pizza.title }</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
};

export default FullPizza;