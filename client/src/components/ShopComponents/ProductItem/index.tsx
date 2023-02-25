import React, { useState } from 'react';
import { Product } from 'store/slices/products/types';
import css from "./index.module.css"

const ProductItem: React.FC<Product> = ({
  id,
  name,
  price,
  categoryId,
  imgDesktop,
  imgMobile,
}) => {

  return (
    <div className={css.Item}>
      <a href="#">
        <picture>
          <source srcSet={process.env.REACT_APP_API_URL as string + imgDesktop} media="(min-width: 1024px)"></source>
          <source srcSet={process.env.REACT_APP_API_URL as string + imgMobile} media="(max-width: 500px)"></source>
          <img src={process.env.REACT_APP_API_URL as string + imgDesktop} alt="Item"></img>
        </picture>
      </a>

      <div className={css.ItemNav}>
        <b>{price} Р</b>
        <button>add</button>
      </div>
                        
      <a href="#"><b>{name}</b></a>
    </div>
  );
}

export default ProductItem;