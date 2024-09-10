import React, { useState } from 'react';
import '../App.css';
import avatar from '../assets/genericavatar.png';
import imagemrio from '../assets/imagemrio.jpg';

const Cadastro = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmaSenha) {
      setErroSenha('As senhas não coincidem!');
      return;
    }
    setErroSenha('');
    // Lógica para enviar os dados do formulário
    console.log('Login:', login);
    console.log('Senha:', senha);
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-left">
          <img src={avatar} alt="avatar generico" className="avatar" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login">Seu melhor e-mail:</label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmaSenha">Confirme a Senha:</label>
              <input
                type="password"
                id="confirmaSenha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
              {erroSenha && <p className="erro-senha">{erroSenha}</p>}
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <div className="cadastro-right">
          <img src={imagemrio} alt="Imagem do Rio" className="imagemrio" />
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
