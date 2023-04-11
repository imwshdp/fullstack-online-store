import React from 'react';
import css from "./index.module.css";

interface TProps {
  children?: string | undefined;
}

const PageHeader: React.FC<TProps> = ({children}) => {
  return (
    <div className={css.PageHeader}>
      <h2>{children}</h2>
    </div>
  );
}

export default PageHeader;