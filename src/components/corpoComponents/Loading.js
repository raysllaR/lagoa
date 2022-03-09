import React from 'react';
import style from './styles/Loading.module.css';

const Loading = () => {
  return (
    <div className={style.Loading}>
      <span className={style.loader}></span>
      <span className={style.text}>Carregando...</span>
    </div>
  )
}

export default Loading;