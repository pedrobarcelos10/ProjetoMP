import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Doacao = () => {
  const [item, setItem] = useState('');
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState('');
  const [dimensoes, setDimensoes] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const dados = {
      nome_item: item,
      tipo_item: tipo,
      peso: peso,
      dimensoes: dimensoes,
      endereco_destino: enderecoDestino,
    };

    try {
      const response = await axios.post('http://localhost:8000/doacoes/doacao/', dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQrCodeUrl(response.data.qr_code);
      setModalIsOpen(true);
      setMensagem('Doação realizada com sucesso!');
    } catch (error) {
      setMensagem('Erro ao realizar a doação. Verifique os dados.');
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

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h2>QR Code gerado com sucesso!</h2>
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR code" />}
          <button onClick={() => setModalIsOpen(false)}>Fechar</button>
        </Modal>

      </div>
    </div>
  );
};

export default Doacao;
