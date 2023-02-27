import * as React from 'react';
import useAppSelector from 'hooks/useAppSelector';
import css from "./index.module.css";

interface TProps {
  header: string;
}

const CatalogSection: React.FC<TProps> = ({header}) => {

  const productsState = useAppSelector(state => state.products)
  
  return (
    <div className={css.Section}>
      <h1>{header}</h1>

      <div className={css.CatalogSectionPanel}>
      </div>

    </div>
  );
}

export default CatalogSection;