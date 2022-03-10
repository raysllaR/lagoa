import React from 'react';
import "./corpoComponents/styles/Carrinho.css";

const CarrinhoTop = () => {
  return (
    <div className="details-carrinho-full">
      <div className="container-data-carrinho">
        <div className="dia-data-carrinho full">25</div>
        <div className="separador-data-carrinho full"></div>
        <div className="conainer-mes-ano-carrinho">
          <div className="mes-data-carrinho full">fevereiro</div>
          <div className="ano-mes-carrinhos">de 2022</div>
        </div>
      </div>
      <div className="container-itens-carrinho">
        <div className="word-total-carrinho">Total</div>
        <div className="container-valor-carrinho">
          <div className="container-icon-carrinho">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{width: '27px', height: '27px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className="contador-carrinho">0</div>
          </div>
          <div className="label-total-carrinho">
            <span>R$</span>
            <div className="valor-carrinho">0,00</div>
          </div>
        </div>
        <div className="container-detail-botton-carrinho">
          <svg className="seta-carrinho para-baixo" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" style={{color: 'rgb(90, 108, 124)', width: '25px', height: '25px'}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
          <div className="detail-botton-carrinho"></div>
        </div>
      </div>
    </div>
  )
}

export default CarrinhoTop;