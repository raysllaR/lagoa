/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tabCard',
  initialState: {
    idGrupoSelecionado: null,
    listCards: null,
  },
  reducers: {
    setIdGrupoSelecionado: (state, action) => { state.idGrupoSelecionado = action.payload; },
    setListCards: (state, action) => { state.listCards = action.payload; },
  },
});

export const { setIdGrupoSelecionado, setListCards } = slice.actions;
export default slice.reducer;
