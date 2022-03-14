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
import CarrinhoTop from './components/CarrinhoTop';
import Login from './pages/Login';
import { openOrCloseCarrinho } from './store/carrinhoData';
import PageNotFound from './pages/PageNotFound';

function App() {
  const isOpen = useSelector((state) => state.carrinho.open);
  const dispatch = useDispatch();

  const close = () => {
    if (isOpen) {
      dispatch(openOrCloseCarrinho());
    }
  };

  return (
    <div
      onClick={close}
    >
      <BrowserRouter>
        <Header />
        <CarrinhoTop />
        <Routes>
          <Route path="/" element={<Calendario />} />
          <Route path="/:url" element={<Corpo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <PosFooter />
    </div>
  );
}

export default App;
