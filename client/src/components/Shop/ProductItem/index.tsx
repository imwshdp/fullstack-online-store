import Button from 'components/UI/Button';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import React from 'react';
import { useNavigate } from 'react-router';
import { RouteNames } from 'router';
import { createBasketProduct } from 'store/slices/basket/actions';

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

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const basketState = useAppSelector(state => state.basket)

  // set active product and navigate
  const click = () => navigate(RouteNames.PRODUCT_ROUTE + '/' + id)

  const addToBasket = () => {
    if(!basketState.basketId) return;

    dispatch(createBasketProduct({
      productId: id,
      basketId: basketState.basketId,
    }))
  }

  return (
    <section
      className={css.Item}
      onClick={click}
    >
      <picture>
        <source srcSet={process.env.REACT_APP_API_URL as string + imgDesktop} media="(min-width: 1024px)"></source>
        <source srcSet={process.env.REACT_APP_API_URL as string + imgMobile} media="(max-width: 500px)"></source>
        <img src={process.env.REACT_APP_API_URL as string + imgDesktop} alt="Фото товара"></img>
      </picture>

      <div className={css.ItemNav}>
        <b>{price} &#8381;</b>
        <div onClick={(e) => e.stopPropagation()}>
          <Button onclick={addToBasket} >В корзину</Button>
        </div>
      </div>
                        
      <b>{name}</b>
    </section>
  );
}

export default ProductItem;