import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Doacao from './components/doacao';
import Cadastro from './components/cadastro';
import Acompanhardoacao from './components/acompanhardoacao';
import Login from './components/login';
import StatusDoacao from './components/StatusDoacao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doacao" element={<Doacao />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/acompanhardoacao" element={<Acompanhardoacao />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doacao/status/:codigo" element={<StatusDoacao />} />
      </Routes>
    </Router>
  );
}

export default App;
