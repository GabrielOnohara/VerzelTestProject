import PropTypes from "prop-types";
import {
    Button,
    Card,
    Col,
  } from "react-bootstrap";

const MovieCard = ({movie}) => {
  return (
    <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
      <Card data-bs-theme="dark">
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
          alt={movie.title}
        />
        <Card.Body>
          <Card.Title className="fw-bold mb-3">{movie.title}</Card.Title>
          <Card.Text className="movieOverview overflow-y-hidden my-auto px-3 mb-3 justify-left">
            {movie.overview || 'Sem resumo'}
          </Card.Text>
          <Button variant="primary">Ver detalhes</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    }).isRequired,
  };

export default MovieCard;
