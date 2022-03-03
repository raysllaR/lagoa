import React from 'react';
import style from './styles/PosFooter.module.css';

const PosFooter = () => {
  return (
    <div className={style.PosFooter}>
        <img src="https://sofaltaeuimagens.s3-sa-east-1.amazonaws.com/sofaltaeu.svg" alt="logo só falta eu" />
    </div>
  );
}

export default React.memo(PosFooter);