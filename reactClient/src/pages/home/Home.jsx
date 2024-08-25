import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import verzelLogo from "../../assets/logo2.jpg";
import "./Home.css";

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
    <div className="homeSection">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container-sm">
        <h1>Home</h1>
        <p className="text-break mx-auto" style={{ width: "50%" }}>
          {token}
        </p>
        {user && <p> {user.username} </p>}
      </div>
    </div>
  );
};

export default Home;
