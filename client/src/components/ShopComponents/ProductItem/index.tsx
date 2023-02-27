import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { RouteNames } from 'router';

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

  const navigate = useNavigate();

  return (
    <div
      className={css.Item}
      onClick={() => navigate(RouteNames.PRODUCT_ROUTE + '/' + id)}
    >
      <picture>
        <source srcSet={process.env.REACT_APP_API_URL as string + imgDesktop} media="(min-width: 1024px)"></source>
        <source srcSet={process.env.REACT_APP_API_URL as string + imgMobile} media="(max-width: 500px)"></source>
        <img src={process.env.REACT_APP_API_URL as string + imgDesktop} alt="Item"></img>
      </picture>

      <div className={css.ItemNav}>
        <b>{price} Р</b>
        <button>add</button>
      </div>
                        
      <b>{name}</b>
    </div>
  );
}

export default ProductItem;