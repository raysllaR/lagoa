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
import { openOrCloseCarrinho } from '../../store/carrinhoData';
import './styles/Carrinho.css';

function Carrinho({
  itensCarrinho, groups, idGrupoSelecionado, setIdGrupoSelecionado, buttonCompraText, setItensCarrinho,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { day, month, year } = state.fetchGetApiIngressos.date;
  month = new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'long' });

  const isOpen = state.carrinho.open;

  const next = (event) => {
    event.stopPropagation();
    let indexOf;
    groups.findIndex((grupo, index) => {
      if (grupo.id === idGrupoSelecionado) {
        indexOf = index;
      }
    });

    if (groups.length - 1 > indexOf) {
      setIdGrupoSelecionado(groups[indexOf + 1].id);
    }

    if (buttonCompraText === 'Finalizar Compra') {
      window.location.href = '/login';
    }
  };

  const excluirItemCarrinho = (event) => {
    event.stopPropagation();

    delete itensCarrinho[event.target.getAttribute('value')];
    if ((Object.keys(itensCarrinho).length === 0)) {
      dispatch(openOrCloseCarrinho());
    }
    setItensCarrinho({ ...itensCarrinho });
  };

  // TODO: mudar a setinha de direção quando clicar no para abrir o carrinho

  const adicionarItensNoListCarrinho = () => {
    const divProdutosCarrinho = document.querySelector('.lista-produtos-carrinho');
    divProdutosCarrinho.innerHTML = '';

    if (Object.keys(itensCarrinho).length === 0) {
      divProdutosCarrinho.innerHTML = '<span>Nenhum produto adicionado ao carrinho</span>';
    } else {
      Object.keys(itensCarrinho).forEach((key) => {
        const newProdutosListaCarrinho = document.createElement('div');
        newProdutosListaCarrinho.classList.add('produto-lista-carrinho');
        newProdutosListaCarrinho.setAttribute('id', itensCarrinho);

        newProdutosListaCarrinho.innerHTML += ` 
          <div class="produto-lista-carrinho" value="${key}"><div class="nome-produto-lista-produtos-carrinho" value="${key}">INGRESSO ANTECIPADO DAY USER + ALMOÇO BOSQUE</div>
          <div class="container-qtde-e-valor-produto">
          <div class="qtde-produto-lista-produtos-carrinho" value="${key}">1x</div>
          <div class="valor-produto-lista-produtos-carrinho" value="${key}">R$&nbsp;99,90</div>
          <svg class="icon-excluir-item-lista-produtos-carrinho" value="${key}" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div></div>
        `;
        divProdutosCarrinho.appendChild(newProdutosListaCarrinho);
      });

      document.querySelectorAll('.icon-excluir-item-lista-produtos-carrinho').forEach((item) => item.addEventListener('click', excluirItemCarrinho));
    }
  };

  React.useEffect(() => {
    if (Object.keys(itensCarrinho).length === 0) {
      document.querySelectorAll('.btn-carrinho-next').forEach((item) => item.setAttribute('disabled', 'disabled'));
    } else {
      document.querySelectorAll('.btn-carrinho-next').forEach((item) => item.removeAttribute('disabled'));
    }

    document.querySelectorAll('.contador-carrinho').forEach((contador) => {
      const keys = Object.keys(itensCarrinho);

      contador.innerText = keys.reduce((soma, key) => soma + itensCarrinho[key].quantidade, 0);
    });

    document.querySelectorAll('.valor-carrinho').forEach((valor) => {
      const keys = Object.keys(itensCarrinho);

      const addVirgula = keys.reduce((soma, key) => soma + (itensCarrinho[key].quantidade * itensCarrinho[key].item.tarifarios[0].valor), 0);

      valor.innerText = (addVirgula / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' });
    });

    adicionarItensNoListCarrinho();
  }, [itensCarrinho]);

  React.useEffect(() => {
    const setasCarrinho = document.querySelectorAll('.seta-carrinho');
    const divCarrinho = document.querySelector('.container-carrinho');
    const divContainerBtnCarrinho = document.querySelector('.container-btn-carrinho');

    setasCarrinho.forEach((seta) => seta.classList.toggle('para-cima'));

    if (isOpen) {
      if (divCarrinho.classList.contains('fechado')) {
        document.querySelector('#tabs').style.marginTop = '200px';
        if (Object.keys(itensCarrinho).length === 0) {
          divContainerBtnCarrinho.style.display = 'none';
        }
      }
    } else {
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
  }, []);

  return (
    <div
      className={`container-carrinho ${isOpen ? 'aberto fechado' : 'fechado'} `}
      onClick={() => dispatch(openOrCloseCarrinho())}
    >
      <div className="container-details-carrinho">
        <div className="details-carrinho">
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
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '27px', height: '27px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <div className="contador-carrinho">0</div>
              </div>
              <div className="label-total-carrinho">
                <span>R$</span>
                <div className="valor-carrinho">0,00</div>
              </div>
            </div>
            <div className="container-detail-botton-carrinho">
              <svg className="seta-carrinho para-baixo para-cima" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" style={{ color: 'rgb(90, 108, 124)', width: '25px', height: '25px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
              <div className="detail-botton-carrinho" />
            </div>
          </div>
        </div>
        <div className={`lista-produtos-carrinho ${isOpen ? 'aberto' : 'fechado'}`}><span className="nenhum-produto">Nenhum produto adicionado ao carrinho</span></div>
      </div>
      <div className={`container-btn-carrinho ${isOpen ? 'aberto-com-produtos' : 'fechado'}`}>
        <button className="btn-carrinho btn-carrinho-buy-other-day" onClick={(event) => { event.stopPropagation(); window.location.href = '/'; }}>
          <span className="outro-dia">Comprar para outro dia</span>
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '17px', height: '17px', marginRight: '5px' }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>

        </button>
        <button className="btn-carrinho btn-carrinho-next" onClick={next}>
          {buttonCompraText}
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
