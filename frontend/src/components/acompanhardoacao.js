import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const Acompanhardoacao = () => {
  const [codigo, setCodigo] = useState('');
  const [statusDoacao, setStatusDoacao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Pegar o token JWT do localStorage

    try {
      const response = await axios.get(`http://localhost:8000/doacoes/status/${codigo}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatusDoacao(response.data.status); // Atualiza o status da doação
    } catch (error) {
      setStatusDoacao('Erro ao buscar status da doação.');
    }
  };

  return (
    <div className="acompanhardoacao-page">
      <div className="acompanhardoacao-container">
        <h1>Acompanhe sua Doação</h1>
        <form onSubmit={handleSubmit} className="acompanhardoacao-form">
          <div className="acompanhardoacao-form-left">
            <div className="acompanhardoacao-form-group">
              <label htmlFor="codigo">Código da Doação:</label>
              <input
                type="text"
                id="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="acompanhardoacao-form-right">
            <button type="submit" className="acompanhardoacao-submit-button">Enviar</button>
          </div>
        </form>
        {statusDoacao && <p>Status da Doação: {statusDoacao}</p>}
      </div>
    </div>
  );
};

export default Acompanhardoacao;
