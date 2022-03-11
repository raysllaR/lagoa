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
    listItens: {},
    listDates: [],
  },
  reducers: {
    openOrCloseCarrinho: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openOrCloseCarrinho } = slice.actions;
export default slice.reducer;
