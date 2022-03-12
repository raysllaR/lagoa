import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Corpo from './pages/Corpo';
import PosFooter from './components/PosFooter';
import Calendario from './pages/Calendario';
import './App.css';
import CarrinhoTop from './components/CarrinhoTop';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CarrinhoTop />
        <Routes>
          <Route path="/" element={<Calendario />} />
          <Route path="/:url" element={<Corpo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <PosFooter />
    </>
  );
}

export default App;
