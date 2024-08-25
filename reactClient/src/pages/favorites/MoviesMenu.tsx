import React, { useState } from "react";
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  Form,
  InputGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";

const MoviesMenu = ({ changeType, typeMovies, searchMovies, search, changeSearch }) => {

  return (
    <ButtonToolbar
      className="mb-4 mt-3"
      aria-label="Toolbar with Button groups"
    >
      <InputGroup data-bs-theme="dark" className="me-auto mb-2">
        <Form.Control
          type="text"
          value={search}
          placeholder="Nome de filme"
          aria-label="Nome de filme"
          aria-describedby="btnGroupAddon"
          onChange={(e) => changeSearch(e.target.value)}
        />
        <InputGroup.Text id="btnGroupAddon">
          <Button onClick={() => searchMovies(1)} variant="outtline-light">Pesquisar</Button>
        </InputGroup.Text>
      </InputGroup>
    </ButtonToolbar>
  );
};

MoviesMenu.propTypes = {
  changeType: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  typeMovies: PropTypes.string.isRequired,
};

export default MoviesMenu;
