import React from 'react'
import {
    Button,
    ButtonToolbar,
    ButtonGroup,
    Form,
    InputGroup,
  } from "react-bootstrap";
import PropTypes from "prop-types";

const MoviesMenu = ({changeType, typeMovies}) => {
  return (
    <ButtonToolbar
          className="mb-5 mt-3"
          aria-label="Toolbar with Button groups"
        >
          <InputGroup data-bs-theme="dark" className="me-auto mb-2">
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
          <ButtonGroup aria-label="First group">
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
  )
}

MoviesMenu.propTypes = {
    changeType: PropTypes.func.isRequired,
    typeMovies: PropTypes.string.isRequired
  };

export default MoviesMenu