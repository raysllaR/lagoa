/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openOrCloseCarrinho } from '../store/carrinhoData';
import './corpoComponents/styles/Carrinho.css';

function CarrinhoTop() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const isOpen = state.carrinho.open;
  let { day, month, year } = state.fetchGetApiIngressos.date;
  month = new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'long' });

  const { value, quantidade } = state.carrinho;

  return (
    <div
      className="details-carrinho-full"
      onClick={(event) => {
        event.stopPropagation();
        !isOpen && dispatch(openOrCloseCarrinho());
        window.scrollTo(0, 345);
      }}
    >
      <div className="container-data-carrinho">
        <div className="dia-data-carrinho full">{day}</div>
        <div className="separador-data-carrinho full" />
        <div className="conainer-mes-ano-carrinho">
          <div className="mes-data-carrinho full">{month}</div>
          <div className="ano-mes-carrinhos">
            de
            {' '}
            {year}
          </div>
        </div>
      </div>
      <div className="container-itens-carrinho">
        <div className="word-total-carrinho">Total</div>
        <div className="container-valor-carrinho">
          <div className="container-icon-carrinho">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '27px', height: '27px' }}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <div className="contador-carrinho">{quantidade}</div>
          </div>
          <div className="label-total-carrinho">
            <span>R$</span>
            <div className="valor-carrinho">{value}</div>
          </div>
        </div>
        <div className="container-detail-botton-carrinho">
          <svg
            className="seta-carrinho para-baixo para-cima"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            style={{
              color: 'rgb(90, 108, 124)',
              width: '25px',
              height: '25px',
            }}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          </svg>
          <div className="detail-botton-carrinho" />
        </div>
      </div>
    </div>
  );
}

export default CarrinhoTop;
