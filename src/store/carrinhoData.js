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
    listDates: [],
  },
  reducers: {
    openOrCloseCarrinho: (state) => {
      state.open = !state.open;
    },
    setListItens: (state, actions) => {
      console.log('O QUE CARALHOS TEM NO PAYLOAD ', actions.payload);
      state.listItens = actions.payload;
      console.log('OLHA OS ITENS DO CARRINHO AQUI NA SUA PORTA', state.listItens);
    },
  },
});

export const { openOrCloseCarrinho, setListItens } = slice.actions;
export default slice.reducer;
