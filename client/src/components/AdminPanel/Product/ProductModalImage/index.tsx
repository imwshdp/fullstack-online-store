import React, { ChangeEvent } from 'react';

import Row from 'components/General/Row';
import Button from 'components/UI/Button';
import FileInput from 'components/UI/FileInput';

interface TProps {
  changeImage: (e: ChangeEvent) => void;
  removeImage: () => void;
}

const ProductModalImage: React.FC<TProps> = ({changeImage, removeImage}) => {
  return (
    <Row>
      <FileInput
        width={'70%'}
        onChange={changeImage}
      />

      <Button
          width={'20%'}
        color='var(--cancelColor)'
        onclick={removeImage}
      >
        Удалить
      </Button>
    </Row>
  );
}

export default ProductModalImage;