import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/auth/login/', {
      username: email,
      password: senha,
    });
    localStorage.setItem('token', response.data.access);
    navigate('/doacao');
  } catch (error) {
    setErro('Email ou senha inválidos!');
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {erro && <p className="erro-login">{erro}</p>}
          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>Não tem uma conta? <button onClick={() => navigate('/cadastro')} className="btn-link">Cadastre-se aqui</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
