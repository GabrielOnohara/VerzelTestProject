import {
  Button,
  ButtonToolbar,
  Form,
  InputGroup,
  ButtonGroup
} from "react-bootstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const MoviesMenu = ({ searchMovies, search, changeSearch, user }) => {

  const handleShareClick = async () => {
    const url = window.location.origin + `/favorites/${user}`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast.info('Link compartilhamento de copiado!')
    } catch (err) {
      console.error("Falha ao copiar para a área de transferência: ", err);
    }
  };

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
          <Button onClick={() => searchMovies()} variant="outtline-light">Pesquisar</Button>
        </InputGroup.Text>
      </InputGroup>
      <ButtonGroup aria-label="First group">
        <Button
            className="py-2"
            variant={'outline-primary'}
            onClick={handleShareClick}
          >
          Compartilhar
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

MoviesMenu.propTypes = {
  searchMovies: PropTypes.func.isRequired,
  changeSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default MoviesMenu;
