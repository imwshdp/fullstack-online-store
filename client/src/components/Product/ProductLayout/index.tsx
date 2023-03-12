import React from 'react';

import PropsAside from '../PropsAside';
import PicturesFeed from '../PicturesFeed';
import css from './index.module.css';

const ProductLayout: React.FC = () => {
  return (
    <div className={css.ProductLayout}>
      <PicturesFeed />
      <PropsAside />
    </div>
  );
}

export default ProductLayout;