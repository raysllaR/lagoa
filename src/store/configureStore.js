import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import contador from './contador';
import modal from './modal';
import logger from './middleware/logger';
import fetchGetApiIngressos from './dadosApi';

const middleware = [...getDefaultMiddleware(), logger];

const reducer = combineReducers({contador, modal, fetchGetApiIngressos});
const store = configureStore({reducer, middleware});

export default store;