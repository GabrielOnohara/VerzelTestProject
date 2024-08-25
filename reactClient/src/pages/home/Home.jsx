import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  ButtonGroup,
  ButtonToolbar,
  Form,
  InputGroup,
} from "react-bootstrap";

import verzelLogo from "../../assets/logo2.jpg";
import "./Home.css";
import NavBar from "./NavBar";

const Home = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const { user, token, tokenWasValidated } = useContext(UserContext);

  if (!tokenWasValidated && token)
    return (
      <div className="homeTokenInvalid">
        <div>
          <img
            src={verzelLogo}
            className="logo2 my-4"
            alt="Verzel Movies logo"
          />
        </div>
        <h1>Validando token..</h1>
        <p>Aguarde alguns segundos</p>
      </div>
    );

  if (!token)
    return (
      <div className="homeTokenInvalid">
        <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
        <h1>Token expirado</h1>
        <p>Necesário validar novamente na tela de login</p>
        <Button className="mt-3" variant="outline-light" onClick={goToLogin}>
          Voltar para o login
        </Button>
      </div>
    );

  return (
    <div className="home">
      <NavBar user={user} />
      <Container className="homeContent py-5">
        <ButtonToolbar
          className="mb-3 mt-3"
          aria-label="Toolbar with Button groups"
        >
          <InputGroup data-bs-theme="dark" className="me-auto">
            <Form.Control
              type="text"
              placeholder="Nome de filme"
              aria-label="Nome de filme"
              aria-describedby="btnGroupAddon"
            />
            <InputGroup.Text id="btnGroupAddon">
              <Button variant="outtline-light" >
                Pesquisar
              </Button>
            </InputGroup.Text>
          </InputGroup>
          <ButtonGroup className="me-2" aria-label="First group">
            <Button variant="outline-light">Mais populares</Button>{" "}
            <Button variant="outline-light">Próximos lançamentos</Button>{" "}
            <Button variant="outline-light">Melhores avaliações</Button>{" "}
            <Button variant="outline-light">Exibindo agora</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
    </div>
  );
};

export default Home;
