import React from 'react';
import useAppSelector from 'hooks/useAppSelector';
import css from "./index.module.css";
import useAppDispatch from 'hooks/useAppDispatch';
import { deleteImage } from 'store/slices/products/actions';

const CatalogModalProps: React.FC = () => {

  const dispatch = useAppDispatch()
  const activeProductState = useAppSelector(state => state.products.activeProduct)

  const confirmDeletingImage = (id: number) => {
    if(window.confirm("Вы действительно хотите подтвердить удаление изображения товара?")) {
      dispatch(deleteImage({id: id}))
    }
  }
  
  return (
    <div className={css.CatalogModalPropsWrapper}>

      <h1>Редактирование информации</h1>
      {activeProductState?.info && activeProductState?.info.map(property =>
        <div
          className={css.CatalogModalPropRow}
          key={property.id}
        >
          {property.title}: {property.description}
        </div>
      )}

      <h1>Редактирование картинок</h1>
      <div className={css.CatalogModalPicturesFeed}>
        {activeProductState?.image && activeProductState?.image.map(img =>
          !img.primary &&
          <div key={img.id} >
            <img
              onClick={() => confirmDeletingImage(img.id)}
              src={process.env.REACT_APP_API_URL as string + img.image}
            />
            {/* <span>Удалить</span> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogModalProps;