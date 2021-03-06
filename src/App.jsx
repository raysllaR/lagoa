/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Corpo from './pages/Corpo';
import PosFooter from './components/PosFooter';
import Calendario from './pages/Calendario';
import './App.css';
import Login from './pages/Login';
import {
  openOrCloseCarrinho, setListItens, setQuantodadeItensCarrinho, setValorCarrinho,
} from './store/carrinhoData';
import MessageError from './components/corpoComponents/MessageError';

function App() {
  const isOpen = useSelector((state) => state.carrinho.open);
  const dispatch = useDispatch();

  const close = () => {
    if (isOpen) {
      dispatch(openOrCloseCarrinho());
    }
  };

  React.useEffect(() => {
    try {
      if (localStorage.getItem('itensListaRedux')) {
        dispatch(setListItens(JSON.parse(localStorage.getItem('itensListaRedux'))));
        dispatch(setValorCarrinho());
        dispatch(setQuantodadeItensCarrinho());
      }
    } catch (e) {
      localStorage.setItem('itensListaRedux', []);
      dispatch(setListItens([]));
    }
  }, []);

  return (
    <div
      onClick={close}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Calendario />} />
          <Route path="/:url" element={<Corpo />} />
          <Route path="/login">
            <Route path="/" element={<Login />} />
            <Route path="/:id" element={<Login isCarrinho />} />
          </Route>
          <Route path="*" element={<MessageError />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <PosFooter />
    </div>
  );
}

export default App;
