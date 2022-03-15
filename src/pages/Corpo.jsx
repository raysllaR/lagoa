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
import CarrinhoTop from '../components/CarrinhoTop';
import Cards from '../components/corpoComponents/Cards';
import Carrinho from '../components/corpoComponents/Carrinho';
import Loading from '../components/corpoComponents/Loading';
import MessageError from '../components/corpoComponents/MessageError';
import Tabs from '../components/corpoComponents/Tabs';
import { setTextProximoFinalizar } from '../store/buttonsText';
import {
  openOrCloseCarrinho, setListItens, setQuantodadeItensCarrinho, setValorCarrinho,
} from '../store/carrinhoData';
import { fetchGetDayIgressos } from '../store/dadosApi';
import { setIdGrupoSelecionado } from '../store/tabCards';
import style from './styles/Corpo.module.css';

function Corpo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, data } = state.fetchGetApiIngressos;
  const { error } = state.fetchGetApiIngressos;
  const { idGrupoSelecionado, listCards } = state.tabCards;
  const { buttonProximoFinalizar } = state.buttonsText;

  React.useEffect(() => {
    dispatch(fetchGetDayIgressos());

    try {
      if (localStorage.getItem('itensListaRedux')) {
        dispatch(setListItens(JSON.parse(localStorage.getItem('itensListaRedux'))));
        dispatch(setValorCarrinho());
        dispatch(setQuantodadeItensCarrinho());
      }
    } catch (e) {
      localStorage.setItem('itensListaRedux', []);
      dispatch(setListItens([]));
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

  const next = (event) => {
    event.stopPropagation();
    const { grupos } = state.fetchGetApiIngressos.data;
    let indexOf;
    grupos.findIndex((grupo, index) => {
      if (grupo.id === idGrupoSelecionado) {
        indexOf = index;
      }
    });

    if (grupos.length - 1 > indexOf) {
      dispatch(setIdGrupoSelecionado(grupos[indexOf + 1].id));
    }

    if (buttonProximoFinalizar === 'Finalizar Compra') {
      window.location.href = '/login/carrinho';
    }
  };

  if (error) { return <MessageError error={error} />; }
  if (loading) { return <Loading />; } // O loading só encerra quando os cards tiverem itens para ser exibidos
  if (!data) { return null; }

  return (
    <>
      <CarrinhoTop />
      <section className={style.ContainerCorpoSite}>
        <Carrinho next={next} />
        <Tabs />
        {
        listCards && <Cards />
      }
      </section>
    </>
  );
}

export default Corpo;
