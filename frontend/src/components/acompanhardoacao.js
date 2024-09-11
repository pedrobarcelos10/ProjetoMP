import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Acompanhardoacao = () => {
  const [doacoes, setDoacoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoacoes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/doacoes/listar_doacoes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar doações', error);
      }
    };

    fetchDoacoes();
  }, []);

  const handleVerStatus = (id) => {
    navigate(`/doacao/status/${id}`);  // Redireciona para a página de status da doação
  };

  return (
    <div className="acompanhardoacao-page">
      <div className="acompanhardoacao-container">
        <h1>Acompanhe suas Doações</h1>
        {doacoes.map((doacao) => (
          <div key={doacao.id} className="doacao-item">
            <p>Item: {doacao.nome_item}</p>
            <button onClick={() => handleVerStatus(doacao.id)}>Ver Status</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Acompanhardoacao;
