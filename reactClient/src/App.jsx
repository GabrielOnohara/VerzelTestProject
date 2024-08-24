import verzelLogo from "./assets/logo2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="root">
      <div>
        <img src={verzelLogo} className="logo my-4" alt="Verzel Movies logo" />
      </div>
      <h1 className="mb-4">Verzel Movies</h1>
      <div className="">
        <Button
          size="lg"
          variant="light"
          className="px-4 mt-2"
          onClick={() => {
            console.log("clicou em acessar");
          }}
        >
          Acessar
        </Button>
      </div>
      <p className="read-the-docs my-3">
        Clique em acessar para iniciar sua jornada no mundo dos filmes
      </p>
    </div>
  );
}

export default App;
