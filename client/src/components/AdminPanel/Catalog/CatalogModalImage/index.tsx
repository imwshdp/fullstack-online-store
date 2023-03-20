import React, { ChangeEvent } from 'react';

import Button from 'components/UI/Button';
import FileInput from 'components/UI/FileInput';
import css from './index.module.css'

interface TProps {
  changeImage: (e: ChangeEvent) => void;
  removeImage: () => void;
}

const CatalogModalImage: React.FC<TProps> = ({changeImage, removeImage}) => {
  return (
    <div className={css.newImageProp} >
      <FileInput
        width={'80%'}
        onChange={changeImage}
      />

      <Button
          width={'15%'}
        color='var(--cancelColor)'
        onclick={removeImage}
      >
        Удалить
      </Button>
    </div>
  );
}

export default CatalogModalImage;