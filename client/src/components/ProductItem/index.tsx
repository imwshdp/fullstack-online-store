import useAppSelector from 'hooks/useAppSelector';
import React, { useState } from 'react';

import pic from 'resources/assets/min.jpg'
import fullPic from 'resources/assets/p.jpg'

import css from "./index.module.css"

interface TProps {
  id: number;
}

// const ProductItem: React.FC<TProps> = (id) => {
  const ProductItem: React.FC = () => {

  // const [item, setItem] = useState();
  // const productsState = useAppSelector(state => state.products);

  // setItem(productsState.products[id]);

  let ItemArray = ["Костюм", 4000]

  return (
    <div className={css.Item}>
      <a href="#">
        <picture>
          <source srcSet={pic} media="(min-width: 1024px)"></source>
          <source srcSet={fullPic} media="(max-width: 500px)"></source>
          <img src={pic} alt="Item"></img>
        </picture>
      </a>

      <div className={css.ItemNav}>
        <b>{ItemArray[1]} Р</b>
        <button>add</button>
      </div>
                        
      <a href="#"><b>{ItemArray[0]}</b></a>
    </div>
  );
}

export default ProductItem;