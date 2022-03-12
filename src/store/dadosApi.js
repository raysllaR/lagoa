/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { setIdGrupoSelecionado } from './tabCards';

/* eslint-disable no-param-reassign */
const { createSlice } = require('@reduxjs/toolkit');

const slice = createSlice({
  name: 'fetchGetApiIngressos',
  initialState: {
    loading: false,
    data: null,
    error: null,
    date: {
      year: '',
      month: '',
      day: '',
    },
  },
  reducers: {
    fetchStarted: (state) => {
      state.loading = true;
    },
    fetchSucess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
    chageDate(state, action) {
      state.date = action.payload;
    },
  },

});

const {
  fetchStarted, fetchSucess, fetchError, chageDate,
} = slice.actions;

export const fetchGetDayIgressos = () => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const dateSelected = window.atob(window.location.href.split('http://localhost:3000/lagoa/#/ingressos/')[1]);

    const [day, month, year] = dateSelected.split('-');

    const response = await fetch(`https://sofalta.eu/api/v4/empreendimentos/lagoa/produtos/ingressos/ingressos?data=${year}-${month}-${day}`);

    const data = await response.json();

    if (data.code === 404) throw new Error(data);

    if (data.itens.length === 0) throw new Error({ code: 404, message: 'Não há ingressos para o dia selecionado!' });

    dispatch(chageDate({ day, month, year }));
    dispatch(setIdGrupoSelecionado(data.grupos[0].id));

    return dispatch(fetchSucess(data));
  } catch (error) {
    return dispatch(fetchError(error));
  }
};

export default slice.reducer;
