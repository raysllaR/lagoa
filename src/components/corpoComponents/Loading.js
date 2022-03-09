import React from 'react';
import './styles/Loading.css';

const Loading = () => {
  return (
    <div className='Loading'>
      <span className='loader'></span>
      <span className='text'>Carregando...</span>
    </div>
  )
}

export default Loading;