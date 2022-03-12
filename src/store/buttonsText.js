/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buttonsText',
  initialState: {
    buttonOutroDia: 'Comprar para outro dia',
    buttonProximoFinalizar: 'Próximo passo',
  },
  reducers: {
    setTextButtonOutroDia: (state, action) => {
      state.buttonOutroDia = action.payload;
    },
    setTextProximoFinalizar: (state, action) => {
      state.buttonProximoFinalizar = action.payload;
    },
  },
});

export const {
  setTextButtonOutroDia,
  setTextProximoFinalizar,
} = slice.actions;
export default slice.reducer;
