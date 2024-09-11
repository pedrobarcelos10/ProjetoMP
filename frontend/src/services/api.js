import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/doacoes/',  // URL base da API Django
});

export const cadastrarUsuario = async (dados) => {
  return await api.post('cadastro/', dados);
};

export const cadastrarDoacao = async (dados) => {
  return await api.post('doacao/', dados);
};

export const buscarMinhasDoacoes = async () => {
  return await api.get('minhas-doacoes/');
};
