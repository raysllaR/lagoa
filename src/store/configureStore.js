import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import carrinho from './carrinhoData';
import logger from './middleware/logger';
import tabCards from './tabCards';
import fetchGetApiIngressos from './dadosApi';
import buttonsText from './buttonsText';

const middleware = [...getDefaultMiddleware(), logger];

const reducer = combineReducers({
  carrinho, fetchGetApiIngressos, tabCards, buttonsText,
});
const store = configureStore({ reducer, middleware });

export default store;
