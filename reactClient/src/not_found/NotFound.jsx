import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import verzelLogo from "../assets/logo2.jpg";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div>
      <div>
        <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
      </div>
      <h1 className="mt-4"> Erro 404 </h1>
      <h2>Página Não Encontrada</h2>
      <p className="mt-4">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Button variant="outline-light" className="py-2 my-3" onClick={goToHome}>
        Voltar para página inicial
      </Button>
    </div>
  );
}

export default NotFound;
