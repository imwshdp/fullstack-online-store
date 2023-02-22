import React from "react";
import css from "./index.module.css"

const Loader = () => {
    return (
        <div className={css.Wrapper}>
            <div className={css.Loader} />
        </div>
    );
};

export default Loader;