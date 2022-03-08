import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Corpo from './pages/Corpo';
import PosFooter from './components/PosFooter';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendario from './pages/Calendario';
import Ingresso from './pages/Ingresso';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendario />} />
        <Route path="/:url" element={<Corpo />} />
      </Routes>
    </BrowserRouter>
      <Footer />
      <PosFooter />
    </React.Fragment>
  )
}

export default App