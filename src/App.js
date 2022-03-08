import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Corpo from './pages/Corpo';
import PosFooter from './components/PosFooter';
import Calendario from './pages/Calendario';
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        
        <Routes>
          <Route path="/" element={<Calendario />} />
          <Route path="/:url" element={<Corpo />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      <PosFooter />
    </React.Fragment>
  )
}

export default App