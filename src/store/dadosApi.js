const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'fetchGetApiIngressos',
    initialState: {
        loading: false,
        data: null,
        error: null
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
        fetchError(state, action){
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        }
    }

});

const { fetchStarted, fetchSucess, fetchError } = slice.actions;

export const fetchGetDayIgressos = (day) => async (dispatch) => {
    try {
        dispatch(fetchStarted());

        const response = await fetch(`https://sofalta.eu/api/v4/empreendimentos/lagoa/produtos/ingressos/ingressos?data=${day}`);

        const data = await response.json();

        if(data.code == 404) throw data;

        if(data.itens.length === 0) throw {code: 404, message: "Não há ingressos para o dia selecionado!"};

        return dispatch(fetchSucess(data));
    } catch (error) {
        console.log("cai no erro")
        return dispatch(fetchError(error));
    }
}

export default slice.reducer;