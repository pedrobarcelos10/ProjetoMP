import React, { useState } from 'react';
import '../App.css';
import { cadastrarUsuario } from '../services/api';  // Importe a função da API

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmaSenha) {
      setErroSenha('As senhas não coincidem!');
      return;
    }
    setErroSenha('');
    
    const dados = {
      nome_completo: nome,
      email: email,
      telefone: telefone,
      endereco: endereco,
      senha: senha,
    };

    try {
      await cadastrarUsuario(dados);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <textarea value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirme a Senha:</label>
            <input type="password" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} required />
            {erroSenha && <p className="erro-senha">{erroSenha}</p>}
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
