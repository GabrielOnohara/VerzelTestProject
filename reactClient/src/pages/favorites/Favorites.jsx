import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { FavoriteContext } from "../../contexts/FavoriteContext";

import verzelLogo from "../../assets/logo2.jpg";
import NavBar from "../home/NavBar";
import MovieCard from "../home/MovieCard";
import MoviesMenu from "../favorites/MoviesMenu";
import "./Favorites.css";
import MovieModal from "../favorites/MovieModal";

const Favorites = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const { user, token, tokenWasValidated, logout } = useContext(UserContext);
  const {
    favoritesLoading,
    displayMovies,
    showFavoriteModal,
    changeFavoriteModal,
    modalMovie,
    changeModalMovie,
    search,
    changeSearch,
    searchMovies,
    removeFromFavoriteMovies
  } = useContext(FavoriteContext);

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
    <div className="favorites pt-4">
      <MovieModal
        showModal={showFavoriteModal}
        changeModal={changeFavoriteModal}
        modalMovie={modalMovie}
        modalAction={removeFromFavoriteMovies}
      />
      <NavBar user={user} logout={logout} />
      <Container className="homeContent pt-5">
        <MoviesMenu
          search={search}
          changeSearch={changeSearch}
          searchMovies={searchMovies}
        />
        <Container className="moviesSection">
          <Row>
            {favoritesLoading ? (
              <Col className="text-center">
                <div className="loadingMovies">
                  <img
                    src={verzelLogo}
                    className="logo2 my-4"
                    alt="Verzel Movies logo"
                  />
                  <p>Carregando filmes...</p>
                </div>
              </Col>
            ) : (
              Array((displayMovies || []).length > 0) &&
              (displayMovies || []).map((movie, index) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  changeModalMovie={changeModalMovie}
                />
              ))
            )}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Favorites;
