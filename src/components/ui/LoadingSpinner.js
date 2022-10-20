import React from 'react';
import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={style.spinner}>
      <div className={style['double-bounce1']}></div>
      <div className={style['double-bounce2']}></div>
    </div>
  );
};

export default LoadingSpinner;
