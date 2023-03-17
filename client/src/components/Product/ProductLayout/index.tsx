import React from 'react';

import PropsAside from '../PropsAside';
import PicturesFeed from '../PicturesFeed';
import css from './index.module.css';
import ReviewSection from '../ReviewSection';

const ProductLayout: React.FC = () => {
  return (
    <div className={css.ProductLayout}>
      <PicturesFeed />
      <PropsAside />
    </div>
  );
}

export default ProductLayout;