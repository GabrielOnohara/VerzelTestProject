import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>Erro 404</h1>
      <h2 className="mt-4">Página Não Encontrada</h2>
      <p className="">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Button variant="outline-light" className="py-2 my-3" onClick={goToHome}>
        Voltar para página inicial
      </Button>
    </div>
  );
}

export default NotFound;
