import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import imagemrio from '../assets/imagemrio.jpg';
import logoo from '../assets/logoo.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="Header">
        <nav className="navbar">
          <div className="nav-left">
            <img src={logoo} alt="Logo do site" className="logo" />
            <span className="nomedaempresa">DoeSul</span>
          </div>
          <div className="nav-right">
            <button onClick={() => navigate('/doacao')}>Faça sua Doação</button>
            <button onClick={() => navigate('/acompanhardoacao')}>Acompanhe sua Doação</button>
          </div>
        </nav>
        
        <div className="content-container">
          <div className="text-container">
            <h1>Doe para o Rio Grande do Sul</h1>
            <p>
              Ajude quem mais precisa no Rio Grande do Sul. Sua doação faz a diferença
              para inúmeras famílias afetadas por enchentes e outros desastres. Doe agora
              e traga esperança para essas pessoas.
            </p>
          </div>
          <div className="image-container">
            <img src={imagemrio} alt="Imagem do Rio" className="imagemrio" />
          </div>
        </div>
      </header>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 DoeSul. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#">Sobre nós</a>
            <a href="#">Contato</a>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;
