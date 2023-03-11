import React, { useEffect } from 'react';
import useAppSelector from 'hooks/useAppSelector';

import css from './index.module.css';

const PicturesFeed: React.FC = () => {
  const activeProduct = useAppSelector(state => state.products.activeProduct)

  return (
    <section className={css.PicturesFeed}>
      <img src={process.env.REACT_APP_API_URL as string + activeProduct?.imgDesktop} />

      <div className={css.Slider}>
        {activeProduct?.image && activeProduct?.image.map(img =>
          // filter
          !img.primary &&
          <img
            key={img.id}
            src={process.env.REACT_APP_API_URL as string + img.image}
            style={{width: `calc(100% / ${activeProduct.image.length})`}}
          />
        )}
      </div>
    </section>
  );
}

export default PicturesFeed;