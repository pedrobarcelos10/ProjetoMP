import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const Doacao = () => {
  const [item, setItem] = useState('');
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState('');
  const [dimensoes, setDimensoes] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Pegar o token JWT do localStorage

    if (!token) {
      setMensagem('Você precisa estar logado para fazer uma doação.');
      return;
    }

    const dados = {
      nome_item: item,
      tipo_item: tipo,
      peso: peso,
      dimensoes: dimensoes,
      endereco_destino: enderecoDestino,
    };

    try {
      await axios.post('http://localhost:8000/doacoes/doacao/', dados, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar o token JWT no cabeçalho da requisição
        },
      });
      setMensagem('Doação realizada com sucesso!');
    } catch (error) {
      setMensagem('Erro ao realizar a doação. Verifique se está logado.');
      console.error(error);
    }
  };

  return (
    <div className="doacao-page">
      <div className="doacao-container">
        <h1>Faça sua Doação</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="item">Item:</label>
            <input
              type="text"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="peso">Peso:</label>
            <input
              type="number"
              id="peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dimensoes">Dimensões:</label>
            <input
              type="text"
              id="dimensoes"
              value={dimensoes}
              onChange={(e) => setDimensoes(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="enderecoDestino">Endereço de Destino:</label>
            <input
              type="text"
              id="enderecoDestino"
              value={enderecoDestino}
              onChange={(e) => setEnderecoDestino(e.target.value)}
              required
            />
          </div>
          {mensagem && <p>{mensagem}</p>}
          <button type="submit">Doar</button>
        </form>
      </div>
    </div>
  );
};

export default Doacao;
