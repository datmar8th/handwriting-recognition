import React from 'react';
import Header from './containers/Header/Header';
import Ocr from './containers/Ocr/Ocr';
import Writer from './containers/Writer/Writer';
import Footer from './containers/Footer/Footer';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Ocr />
      <Writer />
      <Footer />
    </React.Fragment>
  );
}

export default App;
