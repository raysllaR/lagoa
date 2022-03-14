/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTextButtonOutroDia, setTextProximoFinalizar } from '../../store/buttonsText';
import {
  openOrCloseCarrinho,
  setQtdCarrinho,
  setQuantodadeItensCarrinho,
  setValorCarrinho,
} from '../../store/carrinhoData';
import './styles/Carrinho.css';

function Carrinho({
  next, pageLogin, changeLogo, isCalendario,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { day, month, year } = state.fetchGetApiIngressos.date;
  const date = `${year}-${month}-${day}`; // No primeiro dia do mes, se não colocar a hora ele retorna pro ultimo dia do mes anterior
  month = new Date(`${date} 00:00:00`).toLocaleString('default', { month: 'long' });
  const isOpen = state.carrinho.open;
  const { listItens, value, quantidade } = state.carrinho;
  const { buttonOutroDia, buttonProximoFinalizar } = state.buttonsText;

  const excluirItemCarrinho = (event) => {
    event.stopPropagation();
    const id = event.target.getAttribute('id');
    const date = event.target.getAttribute('date');
    dispatch(setQtdCarrinho({ date, id, operacao: 'delete' }));
  };

  const addVirgula = (valueCents) => (
    (valueCents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })
  );

  const adicionarItensNoListCarrinho = () => {
    const divProdutosCarrinho = document.querySelector('.lista-produtos-carrinho');
    divProdutosCarrinho.innerHTML = '';

    if (Object.keys(listItens).length === 0) {
      divProdutosCarrinho.innerHTML = '<span>Nenhum produto adicionado ao carrinho</span>';
    } else {
      Object.keys(listItens).forEach((key, index) => {
        [year, month, day] = key.split('-');
        let monthString = new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'long' });

        if (index > 0) {
          divProdutosCarrinho.innerHTML += '<div style="border-bottom: solid 0.25px #dee6ed; width: 98%; margin-top: 1%; margin-bottom: 1%" ></div>';
        }
        divProdutosCarrinho.innerHTML += `
          <div class="dateCarrinho" style="text-align: center; padding: 5px; padding-top: 20px; box-sizing: border-box; color: rgb(90, 108, 124); font-size: 1.1em; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; transition: all 0.2s ease 0s;">
            ${day} de ${monthString} de ${year}<span class="" value="${day}-${month}-${year}" style="color: rgb(45, 157, 1); background-color: rgb(241, 255, 235); font-size: 0.87rem; padding: 4px 13px; border-radius: 6px; margin: 0px 5px; cursor: pointer;">${key === date ? 'Dia selecionado' : 'Alterar'}</span>
          </div>
        `;

        Object.keys(listItens[key]).forEach((keyItem) => {
          const newProdutosListaCarrinho = document.createElement('div');
          newProdutosListaCarrinho.classList.add('produto-lista-carrinho');
          const objectItem = listItens[key][keyItem];
          newProdutosListaCarrinho.setAttribute('id', keyItem);
          newProdutosListaCarrinho.innerHTML += ` 
              <div class="produto-lista-carrinho" value="${keyItem}"><div class="nome-produto-lista-produtos-carrinho" value="${keyItem}">${objectItem.nome}</div>
              <div class="container-qtde-e-valor-produto">
              <div class="qtde-produto-lista-produtos-carrinho" value="${keyItem}">${objectItem.quantidade}x</div>
              <div class="valor-produto-lista-produtos-carrinho" value="${keyItem}">R$ ${addVirgula(objectItem.tarifarios[0].valor)}</div>
              <svg class="icon-excluir-item-lista-produtos-carrinho" date=${key} value="${key}" id="${keyItem}" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </div></div>
            `;
          divProdutosCarrinho.appendChild(newProdutosListaCarrinho);
        });
      });

      document.querySelectorAll('.dateCarrinho').forEach((date) => date.addEventListener('click', ({ target }) => {
        if (target.textContent === 'Alterar') {
          dispatch(openOrCloseCarrinho());
          window.location.href = `http://localhost:3000/lagoa/#/ingressos/${window.btoa(target.getAttribute('value'))}`;
          if (!isCalendario) {
            window.location.reload(); // Precisa do reloading para a page do corpo, mas não para a do calendario
          }
        }
      }));
      document.querySelectorAll('.icon-excluir-item-lista-produtos-carrinho').forEach((item) => item.addEventListener('click', excluirItemCarrinho));
    }
  };

  React.useEffect(() => {
    if (Object.keys(listItens).length === 0) {
      document.querySelectorAll('.btn-carrinho-next').forEach((item) => item.setAttribute('disabled', 'disabled'));
    } else {
      document.querySelectorAll('.btn-carrinho-next').forEach((item) => item.removeAttribute('disabled'));
    }

    dispatch(setValorCarrinho());
    dispatch(setQuantodadeItensCarrinho());

    adicionarItensNoListCarrinho();
    (Object.keys(listItens).length === 0 && isOpen) && dispatch(openOrCloseCarrinho());
  }, [listItens]);

  React.useEffect(() => {
    const setasCarrinho = document.querySelectorAll('.seta-carrinho');
    const divCarrinho = document.querySelector('.container-carrinho');
    const divContainerBtnCarrinho = document.querySelector('.container-btn-carrinho');

    setasCarrinho.forEach((seta) => seta.classList.toggle('para-cima'));

    if (isOpen && !pageLogin && !isCalendario) {
      if (divCarrinho.classList.contains('fechado')) {
        document.querySelector('#tabs').style.marginTop = '200px';
        if (Object.keys(listItens).length === 0) {
          divContainerBtnCarrinho.style.display = 'none';
        }
      }
    } else if (document.querySelector('#tabs')) {
      document.querySelector('#tabs').style.marginTop = '10px';
      if (!divContainerBtnCarrinho.classList.contains('aberto-com-produtos')) {
        divContainerBtnCarrinho.style.display = 'flex';
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    const divCarrinhoFull = document.querySelector('.details-carrinho-full');
    const divDetailsCarrinho = document.querySelector('.details-carrinho');

    window.addEventListener('scroll', () => {
      const distanciaDoElementoAoTop = -2;
      divCarrinhoFull.style.top = divDetailsCarrinho.getBoundingClientRect().top + document.querySelector('.container-carrinho').clientHeight - 120 <= distanciaDoElementoAoTop ? 0 : '-90px';
    });

    window.addEventListener('resize', () => (
      dispatch(setTextButtonOutroDia(window.innerWidth < 546 ? 'Outro dia' : 'Comprar para outro dia'))
    ));

    if (isCalendario) {
      dispatch(setTextProximoFinalizar('Finalizar Compra'));
    }
  }, []);

  return (
    <div
      style={pageLogin || isCalendario ? {
        margin: '0 auto', marginBottom: (pageLogin || isCalendario) ? (pageLogin ? '15px' : '-45px') : '0', left: 0, right: 0,
      } : {}}
      className={`container-carrinho ${isOpen ? 'aberto fechado' : 'fechado'} `}
      onClick={(event) => {
        event.stopPropagation();
        if (!pageLogin) {
          dispatch(openOrCloseCarrinho());
        }
      }}
    >
      <div className="container-details-carrinho">
        <div className="details-carrinho" style={pageLogin ? { width: '100%', maxWidth: '550px', cursor: 'auto' } : {}}>
          <div className="container-data-carrinho">
            {(changeLogo || isCalendario) && <img width={114} src="https://sofaltaeuimagens.s3-sa-east-1.amazonaws.com/maiseu.svg" alt="logo so falta eu carrinho" />}
            {(!changeLogo && !isCalendario
            ) && (
            <>
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
            </>
            )}
          </div>
          <div className="container-itens-carrinho">
            <div className="word-total-carrinho">Total</div>
            <div className="container-valor-carrinho">
              <div className="container-icon-carrinho">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '27px', height: '27px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
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
                  color: 'rgb(90, 108, 124)', width: '25px', height: '25px', display: (pageLogin) ? 'none' : '',
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
        <div className={`lista-produtos-carrinho ${isOpen ? 'aberto' : 'fechado'}`}><span className="nenhum-produto">Nenhum produto adicionado ao carrinho</span></div>
      </div>
      <div className={`container-btn-carrinho ${isOpen ? 'aberto-com-produtos' : 'fechado'}`} style={pageLogin ? { display: 'none' } : (!isOpen && isCalendario ? { display: 'none' } : {})}>
        <button className="btn-carrinho btn-carrinho-buy-other-day" style={(isCalendario) ? { display: 'none' } : {}} onClick={(event) => { event.stopPropagation(); window.location.href = '/'; }}>
          <span className="outro-dia">{buttonOutroDia}</span>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px', marginRight: '5px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
        <button className={`btn-carrinho btn-carrinho-next ${isCalendario ? 'isCalendario' : ''}`} onClick={next}>
          {buttonProximoFinalizar}
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '21px', height: '21px', marginTop: '2px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default React.memo(Carrinho);
