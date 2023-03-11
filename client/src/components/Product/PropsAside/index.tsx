import React from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import css from './index.module.css';
import Button from 'components/UI/Button';
import { createBasketProduct, fetchBasket } from 'store/slices/basket/actions';

const PropsAside: React.FC = () => {

  const dispatch = useAppDispatch()
  const activeProduct = useAppSelector(state => state.products.activeProduct)
  const basket = useAppSelector(state => state.basket)

  const addToBasket = () => {
    if(!activeProduct?.id || !basket.basketId) return;
    
    console.log(activeProduct?.id, basket.basketId)
    
    // add product to basket
    dispatch(createBasketProduct({
      productId: activeProduct?.id,
      basketId: basket.basketId,
    }))
  }

  return (
    <aside className={css.AsideProps}>

      <h1>{activeProduct?.name}</h1>

      {activeProduct?.info.map(i =>
        <div key={i.id} className={css.ProductInfo}>
          <span>{i.title}</span>
          <span>{i.description}</span>
        </div>
      )}

      <div className={css.ToBasket}>
        <Button
          height={50}
          width={150}
          onclick={addToBasket}
        >
          В корзину
        </Button>
      </div>

    </aside>
  );
}

export default PropsAside;