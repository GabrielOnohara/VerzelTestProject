import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  ButtonGroup,
  ButtonToolbar,
  Form,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

import { UserContext } from "../../contexts/UserContext";
import { MovieContext } from "../../contexts/MovieContext";
import verzelLogo from "../../assets/logo2.jpg";
import "./Home.css";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";

const Home = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const { user, token, tokenWasValidated } = useContext(UserContext);
  const { displayMovies, loadingMovies, changeType, typeMovies } =
    useContext(MovieContext);

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
          className="mb-5 mt-3"
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
              <Button variant="outtline-light">Pesquisar</Button>
            </InputGroup.Text>
          </InputGroup>
          <ButtonGroup className="me-2" aria-label="First group">
            <Button
              variant={typeMovies == "popular" ? "light" : "outline-light"}
              onClick={() => changeType("popular")}
            >
              Mais populares
            </Button>{" "}
            <Button
              variant={typeMovies == "upcoming" ? "light" : "outline-light"}
              onClick={() => changeType("upcoming")}
            >
              Próximos lançamentos
            </Button>{" "}
            <Button
              variant={typeMovies == "top_rated" ? "light" : "outline-light"}
              onClick={() => changeType("top_rated")}
            >
              Melhores avaliações
            </Button>{" "}
            <Button
              variant={typeMovies == "now_playing" ? "light" : "outline-light"}
              onClick={() => changeType("now_playing")}
            >
              Exibindo agora
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Row>
          {loadingMovies ? (
            <Col className="text-center">
             <div className="loadingMovies">
                <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
                <p>Carregando filmes...</p>
             </div>
            </Col>
          ) : (
            Array((displayMovies || []).length > 0) &&
            (displayMovies || []).map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
