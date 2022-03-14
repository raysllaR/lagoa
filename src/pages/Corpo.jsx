/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../components/corpoComponents/Cards';
import Carrinho from '../components/corpoComponents/Carrinho';
import Loading from '../components/corpoComponents/Loading';
import MessageError from '../components/corpoComponents/MessageError';
import Tabs from '../components/corpoComponents/Tabs';
import { setTextProximoFinalizar } from '../store/buttonsText';
import { openOrCloseCarrinho, setListItens } from '../store/carrinhoData';
import { fetchGetDayIgressos } from '../store/dadosApi';
import style from './styles/Corpo.module.css';

function Corpo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, data } = state.fetchGetApiIngressos;
  const { error } = state.fetchGetApiIngressos;
  const { idGrupoSelecionado, listCards } = state.tabCards;

  React.useEffect(() => {
    dispatch(fetchGetDayIgressos());

    try {
      if (localStorage.getItem('itensListaRedux')) {
        dispatch(setListItens(JSON.parse(localStorage.getItem('itensListaRedux'))));
      }
    } catch (e) {
      localStorage.setItem('itensListaRedux', []);
      dispatch(setListItens([]));
      setItensCard({});
    }
  }, []);

  React.useEffect(() => {
    if (data != null
      && data.grupos !== null
      && idGrupoSelecionado != null) {
      let indexOf;

      data.grupos.findIndex((group, index) => {
        if (group.id === idGrupoSelecionado) { indexOf = index; }
      });

      dispatch(setTextProximoFinalizar((indexOf === data.grupos.length - 1) ? 'Finalizar Compra' : 'Próximo passo'));
    }
  }, [data, idGrupoSelecionado]);

  if (error) { return <MessageError error={error} />; }
  if (loading) { return <Loading />; } // O loading só encerra quando os cards tiverem itens para ser exibidos
  if (!data) { return null; }

  return (
    <section className={style.ContainerCorpoSite}>
      <Carrinho />
      <Tabs />
      {
        listCards && <Cards />
      }
    </section>
  );
}

export default Corpo;
