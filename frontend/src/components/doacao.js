import React, { useState } from 'react';
import '../App.css';

const Doacao = () => {
  const [item, setItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    console.log('Item:', item);
  };

  return (
    <div className='doacao-page'>
      <div className="doacao-container">
        <div className='doacao-left'>
          <h1>Faça sua Doação</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="doacao">Item:</label>
              <input
                type="text"
                id="doacao"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>

            <button type="submit">Doar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Doacao;
