import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'carrinho',
    initialState: {
        open: false,
        value: '0,00',
        quantidade: '0',
        date: {
            year: '',
            month: '',
            day: ''
        },
        listItens: {

        }
    },
    reducers: {
        openCarrinho: (state) => state.open = true,
        closeCarrinho: (state) => state.open = false,
    }
});

export const { openCarrinho, closeCarrinho } = slice.actions;
export default slice.reducer;