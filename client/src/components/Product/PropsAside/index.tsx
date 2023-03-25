import React from 'react';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { createBasketProduct } from 'store/slices/basket/actions';

import Button from 'components/UI/Button';
import css from './index.module.css';

const PropsAside: React.FC = () => {

  const dispatch = useAppDispatch()
  const basketState = useAppSelector(state => state.basket)
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  const addToBasket = () => {
    if(!activeProduct?.id || !basketState.basketId) return;
    
    // add product to basket
    dispatch(createBasketProduct({
      productId: activeProduct?.id,
      basketId: basketState.basketId,
    }))
  }

  return (
    <aside className={css.AsideProps}>
      <div
        className={css.ProductInfo}
      >
        <h1>{activeProduct?.name}</h1>
        {activeProduct?.info.map(i =>
          <div key={i.id} className={css.InfoRow}>
            <span>{i.title}</span>
            <span>{i.description}</span>
          </div>
        )}
      </div>

      <Button
        height={45}
        width={125}
        onclick={addToBasket}
      >
        В корзину
      </Button>

    </aside>
  );
}

export default PropsAside;