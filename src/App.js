import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Corpo from './components/Corpo';
import PosFooter from './components/PosFooter';
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Corpo />
      <Footer />
      <PosFooter />
    </React.Fragment>
  )
}

export default App