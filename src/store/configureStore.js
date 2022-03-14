import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import carrinho from './carrinhoData';
import tabCards from './tabCards';
import fetchGetApiIngressos from './dadosApi';
import buttonsText from './buttonsText';

const reducer = combineReducers({
  carrinho, fetchGetApiIngressos, tabCards, buttonsText,
});
const store = configureStore({ reducer });

export default store;
