import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./Home.css";

const MovieModal = ({
  showModal,
  changeModal,
  modalMovie,
  modalAction,
  favoriteMovies,
}) => {
  const backgroundImage = modalMovie
    ? `https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`
    : "/logo2.jpg";
    const movieAlreadyInFavorite = modalMovie
    ? favoriteMovies.some((movie) => movie.id === modalMovie.id)
    : false;
  return (
    <Modal
      className="movieModal"
      show={showModal}
      onHide={() => changeModal(false)}
      size="fluid"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header className="fw-bold" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalMovie ? modalMovie.title : "Título"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundImage: `url(${backgroundImage}) `,
        }}
        className="d-flex modalMovieBody"
      >
        <div className="py-3">
          <h4>Sobre</h4>
          <p className=" modalOverview">
            {modalMovie ? modalMovie.overview : "Resumo"}
          </p>
          <p>
            <span className="fw-bold me-2">Data de lançamento:</span>
            {modalMovie
              ? modalMovie.release_date.split("-").reverse().join("/")
              : "1234-12-12"}
          </p>
          <p>
            <span className="fw-bold me-2">Faixa etária:</span>
            {modalMovie && modalMovie.adult ? "Adultos(18+)" : "Livre"}
          </p>
          <p>
            <span className="fw-bold me-2">Avaliação:</span>
            {modalMovie && modalMovie.vote_average
              ? modalMovie.vote_average
              : 0.0}
          </p>
          <p>
            <span className="fw-bold me-2">Contagem de votos:</span>
            {modalMovie && modalMovie.vote_count ? modalMovie.vote_count : 0.0}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={movieAlreadyInFavorite}
          variant="success"
          onClick={() => modalAction(modalMovie)}
        >
          {movieAlreadyInFavorite ? 'Favoritado' : 'Favoritar'}
        </Button>
        <Button variant="primary" onClick={() => changeModal(false)}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  changeModal: PropTypes.func.isRequired,
  modalAction: PropTypes.func.isRequired,
  modalMovie: PropTypes.object,
  favoriteMovies: PropTypes.array.isRequired
};

export default MovieModal;
