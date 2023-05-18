import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addItem} from "../../redux/slices/cartSlice";
import {Link} from 'react-router-dom';
import {RootState} from '../../redux/store';

const pizzaTypes = ['тонкое', 'традиционное'];

type IndexProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

type cartItemsType = {
  count: any;
}

const Index: React.FC<IndexProps> = ({id, title, price, imageUrl, sizes, types}) => {
  const dispatch = useDispatch();
  const cartItems: cartItemsType | undefined = useSelector((state: RootState) => state.cartSlice.items.find((obj: {id: string}) => obj.id === id));
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);


  // const addedCount = cartItems ? cartItems.count : 0;


  const onClickAdd = () => {
    const item ={
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: pizzaTypes[activeType],
    };
    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link  to={`./pizza/${id}`}>
          <img className="pizza-block__image"
               src={imageUrl}
               width="584"
               height="584"
               alt="Pizza"/>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {
              types.map((type, index) => (
                <li key={index} onClick={() => setActiveType(index)}
                    className={activeType === index ? 'active' : ''}>{pizzaTypes[type]}</li>
              ))
            }
          </ul>
          <ul>
            {
              sizes.map((size, index) => (
                <li key={index} onClick={() => setActiveSize(index)}
                    className={activeSize === index ? 'active' : ''}>{size} см.</li>
              ))
            }
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}&nbsp;₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"></path>
            </svg>
            <span>Добавить</span>
            {/*{addedCount > 0 && <i>{addedCount}</i>}*/}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;