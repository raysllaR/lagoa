/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'tab',
  initialState: null,
  reducers: {
    setIdGrupoSelecionado: (state, action) => action.payload,
  },
});

export const { setIdGrupoSelecionado } = slice.actions;
export default slice.reducer;
