/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdGrupoSelecionado, setListCards } from '../../store/tabCards';
import style from './styles/Tabs.module.css';

function Tabs() {
  // Entrega o id da primeira posição do array
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { grupos, itens } = state.fetchGetApiIngressos.data;
  const { idGrupoSelecionado } = state.tabCards;
  const mudarIdGrupoParaIdTabSelecionado = ({ target }) => { dispatch(setIdGrupoSelecionado(target.id)); };

  React.useEffect(() => {
    const setItensCardsUsandoIdGrupoSelecionado = (array) => array.filter((item) => item.grupos.includes(idGrupoSelecionado));

    const listItensCard = setItensCardsUsandoIdGrupoSelecionado(itens);
    listItensCard.sort((obj1, obj2) => (((obj1[idGrupoSelecionado] > obj2[idGrupoSelecionado])) ? -1 : 1));
    dispatch(setListCards(listItensCard));
    console.log('MDS CADE A LISTA? ', listItensCard);
  }, []);

  return (
    <div className={style.Tabs} id="tabs">
      {grupos.map((grupo) => (
        <button onClick={mudarIdGrupoParaIdTabSelecionado} key={grupo.id} id={grupo.id} className={grupo.id === idGrupoSelecionado ? style.buttonAtivo : ''}>{grupo.nome}</button>
      ))}
    </div>
  );
}

export default React.memo(Tabs); // A aplicação estava sendo recarregada duas vezes, uma pelo corpo e outra por sozinha, o memo evita q ela seja recarregada pelo corpo
