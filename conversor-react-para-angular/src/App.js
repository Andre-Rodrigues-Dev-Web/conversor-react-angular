import React, { useState } from 'react';
import './App.css';
import Editor from './Components/Editor';
import Topo from './Components/Topo';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="App">
      <Topo />
      <Editor />
      <Footer />
    </div>
  );
}

export default App;
