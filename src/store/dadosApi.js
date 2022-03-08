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

const { fetchStarted, fetchSucess, fetchError } = createSlice.actions;

export const fetchGetDayIgressos = (day, atob) => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const response = await fetch(`https://sofalta.eu/api/v4/empreendimentos/lagoa/produtos/ingressos/ingressos?data=${atob(day)}`);

        const data = await response.json();
        return dispatch(fetchSucess(data));
    } catch (error) {
        return dispatch(fetchError(error.message));
    }
}

export default slice.reducer;