import React from 'react';

import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import css from "./index.module.css";

const FilterPanel: React.FC = () => {

  let OptionsArray = ["По названию", "По цене"];

  return (
    <section className={css.FilterPanel}>
        
      <div className={css.MainFilter}>
        <Input>
          Введите название
        </Input>
        <Select>
          {OptionsArray}
        </Select>
      </div>

      <div className={css.ViewPanel}>
        <div className={css.ViewButton}></div>
        <div className={css.ViewButton}></div>
      </div>

    </section>
  );
}

export default FilterPanel;