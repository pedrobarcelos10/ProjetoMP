import React, { useState } from 'react';
import '../App.css';

const Acompanhardoacao = () => {
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o código da doação
    console.log('Código da Doação:', codigo);
  };

  return (
    <div className="acompanhardoacao-page">
      <div className="acompanhardoacao-container">
        <h1>Doação</h1>
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
      </div>
    </div>
  );
};

export default Acompanhardoacao;
