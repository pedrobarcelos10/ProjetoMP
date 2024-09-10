import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Doacao from './components/doacao';
import Cadastro from './components/cadastro';
import Acompanhardoacao from './components/acompanhardoacao';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/acompanhardoacao" element={<Acompanhardoacao />} />
      </Routes>
    </Router>
  );
}

export default App;
