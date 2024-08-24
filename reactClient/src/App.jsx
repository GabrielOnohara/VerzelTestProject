import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import verzelLogo from "./assets/logo2.jpg";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="root">
      <div>
        <img src={verzelLogo} className="logo my-4" alt="Verzel Movies logo" />
      </div>
      <h1 className="mb-4">Verzel Movies</h1>
      <Button
        size="lg"
        variant="outline-light"
        className="px-4 mt-2"
        onClick={goToLogin}
      >
        Acessar
      </Button>
      <p className="read-the-docs my-3">
        Clique em acessar para iniciar sua jornada no mundo dos filmes
      </p>
    </div>
  );
}

export default App;
