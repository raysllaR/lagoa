/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListItens } from '../../store/carrinhoData';
import './styles/Cards.css';

function Cards({
  itens, qtdParcelamentos, setItensCarrinho, itensCarrinho,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { day, month, year } = state.fetchGetApiIngressos.date;
  const { listItens } = state.carrinho;
  const date = `${year}-${month}-${day}`;
  let condicao = false;
  let isEqualsValorOriginal = false;

  const itemMaisVendido = (arrayGrupos, arraIdGruposMaisVendidos) => arrayGrupos.find((grupo) => arraIdGruposMaisVendidos.includes(grupo));

  const toLocaleStringMoedaBR = (value, withType) => {
    value /= 100;

    if (withType) return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });

    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' });
  };

  const changeValueItemCardAndAddToCarrinho = (event, item, acao) => {
    event.stopPropagation();
    const id = item.iditens;

    if (!itensCarrinho[id + date]) {
      setItensCarrinho({ ...itensCarrinho, [id + date]: { dateCompra: date, quantidade: 1, item: { ...item } } });

      const newItem = { ...item, quantidade: 1 };
      console.log('SIM É UM NOVO ITEM IGUAL AO VELHO + 1 ', newItem);
      console.log('DATE ', date);
      console.log('DATE LIST ', listItens[date]);

      if (listItens[date]) {
        dispatch(setListItens({ ...listItens, [date]: { itens: [...listItens[date].itens, newItem] } }));
      } else {
        console.log('OPA TO AQUI');
        dispatch(setListItens({ ...listItens, [date]: { itens: [newItem] } }));
      }
    } else {
      switch (acao) {
        case 'add':
          itensCarrinho[id + date].quantidade++;
          break;
        case 'sub':
          if (itensCarrinho[id + date].quantidade > 0) {
            itensCarrinho[id + date].quantidade--;
          }
          if (itensCarrinho[id + date].quantidade === 0) {
            delete itensCarrinho[id + date];
            setItensCarrinho({ ...itensCarrinho });
            return;
          }
          break;
      }

      setItensCarrinho({ ...itensCarrinho, [id + date]: { ...itensCarrinho[id + date] } });
    }
  };

  const saveToLocaleString = (listItens) => {
    localStorage.setItem('itensLista', JSON.stringify(listItens));
  };

  const saveToLocaleStringRedux = (listItens) => {
    localStorage.setItem('itensListaRedux', JSON.stringify(listItens));
  };

  return (
    <section className="cards">
      <div className="container-cards container-cards-ativo">
        {console.log('LIST ITWNS ', listItens)}
        {itens.map((item) => (
          <div key={item.iditens} className="card">
            {saveToLocaleString(itensCarrinho)}
            {saveToLocaleStringRedux(listItens)}
            { isEqualsValorOriginal = (item.tarifarios[0].valor === item.valorOriginal) }
            <img alt="" className="img-card" src={`${item.imagem}`} />
            { itemMaisVendido(item.grupos, item.idGroupMaisVendidos) && <img className="img-imagem-mais-vendido" src="https://sofalta.eu/meuingresso/public/assets/images/arts/mais-vendido.png" />}
            <div className="infos-card">
              <div className="container-descricao-card">
                <div className="container-nome-valor-produto-card">
                  <div className="nome-produto">
                    $
                    {item.nome}
                  </div>
                  <div className="container-valor-produto">
                    { !isEqualsValorOriginal && <span className="valor-original-card">{`${toLocaleStringMoedaBR(item.valorOriginal, true)}`}</span> }
                    <div className="container-display-valor">
                      <span>R$</span>
                      <div className="valor-produto">{toLocaleStringMoedaBR(item.tarifarios[0].valor, false)}</div>
                    </div>
                    { isEqualsValorOriginal && <div className="max-parcelamento">{`em até ${qtdParcelamentos}x`}</div>}
                  </div>
                </div>
                <div className="descricao-card">
                  <p>{item.descricao}</p>
                </div>
              </div>
              <div className="container-regras-card">
                <div className="regra-card-ativo">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="23px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="regra-idade">{'A partir de 11 anos' /*  ${item.itens.ingressos[0]['idade_minima']} */}</span>
                </div>
                <div className="regra-card-ativo">
                  <svg className="regra-condicao" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="23px" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span className="regra-condicao">Regras e condições</span>
                </div>
              </div>
              {condicao = !itensCarrinho[item.iditens + date]}
              <div className={`container-btn-card ${condicao && 'isComprar'}`}>
                <div className={`btn-comprar-card ${condicao && 'isComprar'}`} onClick={(event) => changeValueItemCardAndAddToCarrinho(event, item, 'add')}>
                  <div className={`btn btn-subtrair ${condicao && 'isComprarBtn'}`} onClick={(event) => changeValueItemCardAndAddToCarrinho(event, item, 'sub')}>-</div>
                  <span className="label-quantidade-produto">
                    {' '}
                    { condicao ? 'Comprar' : itensCarrinho[item.iditens + date].quantidade}
                  </span>
                  <div className={`btn btn-adicionar ${condicao && 'isComprarBtn'}`} onClick={(event) => changeValueItemCardAndAddToCarrinho(event, item, 'add')}>+</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cards;
