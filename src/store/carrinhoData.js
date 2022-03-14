/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'carrinho',
  initialState: {
    open: false,
    value: '0,00',
    quantidade: '0',
    date: {
      year: '',
      month: '',
      day: '',
    },
    listItens: [],
  },
  reducers: {
    openOrCloseCarrinho: (state) => {
      state.open = !state.open;
    },
    setListItens: (state, actions) => {
      state.listItens = actions.payload;
    },
    setValorCarrinho: (state) => {
      const somaCents = Object.keys(state.listItens).reduce((acumulado, date) => acumulado + Object.keys(state.listItens[date]).reduce((segundoAcumulador, keyItem) => (segundoAcumulador + (state.listItens[date][keyItem].quantidade * state.listItens[date][keyItem].tarifarios[0].valor)), 0), 0);
      state.value = (somaCents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' });
    },
    setQuantodadeItensCarrinho: (state) => {
      state.quantidade = Object.keys(state.listItens).reduce((acumulado, date) => acumulado + Object.keys(state.listItens[date]).reduce((segundoAcumulador, keyItem) => (segundoAcumulador + state.listItens[date][keyItem].quantidade), 0), 0);
    },
    setQtdCarrinho: (state, action) => {
      const { date, id, operacao } = action.payload;
      const { listItens } = state;
      if (listItens[date] && listItens[date][id]) {
        const changeQtd = {
          add: () => { listItens[date][id].quantidade++; },
          sub: () => {
            (listItens[date][id].quantidade > 0) && listItens[date][id].quantidade--;
            (listItens[date][id].quantidade === 0) && changeQtd.delete();
          },
          delete: () => {
            delete listItens[date][id];
            (!Object.keys(listItens[date]).length) && delete listItens[date];
            localStorage.setItem('itensListaRedux', JSON.stringify(listItens));
          },
        };

        changeQtd[operacao] && changeQtd[operacao]();
      }
    },
  },
});

export const {
  openOrCloseCarrinho,
  setListItens,
  setQtdCarrinho,
  setValorCarrinho,
  setQuantodadeItensCarrinho,
} = slice.actions;
export default slice.reducer;
