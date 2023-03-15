import React, { useState, useEffect } from 'react';
import useAppSelector from 'hooks/useAppSelector';

import css from './index.module.css';

const PicturesFeed: React.FC = () => {

  const activeProduct = useAppSelector(state => state.products.activeProduct)
  
  const [activeImage, setActiveImage] = useState<string>('')

  useEffect(() => {
    if(!activeProduct) return;
    setActiveImage(process.env.REACT_APP_API_URL as string + activeProduct?.imgDesktop)
  }, [activeProduct])

  const changePicture = (file: File) => {
    setActiveImage(process.env.REACT_APP_API_URL as string + file)
  }

  return (
    <section className={css.PicturesFeed}>
      
      <img src={activeImage} />

      <div className={css.Slider}>
        {activeProduct?.image && activeProduct?.image.map(img =>
          // filter mobile
          !img.image.includes('mobile') &&
          <img
            onClick={() => changePicture(img.image)}
            key={img.id}
            src={process.env.REACT_APP_API_URL as string + img.image}
          />
        )}
      </div>
    </section>
  );
}

export default PicturesFeed;