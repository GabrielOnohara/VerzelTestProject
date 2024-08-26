import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import "./Home.css";
import { UserContext } from "../../contexts/UserContext";
import { MovieContext } from "../../contexts/MovieContext";
import verzelLogo from "../../assets/logo2.jpg";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import NavBar from "./NavBar";
import MovieCard from "./MovieCard";
import MoviePagination from "./MoviePagination";
import MoviesMenu from "./MoviesMenu";
import MovieModal from "./MovieModal";

const Home = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const { user, token, tokenWasValidated, logout } = useContext(UserContext);
  const {
    displayMovies,
    loadingMovies,
    changeType,
    typeMovies,
    page,
    changePage,
    displayMoviesTotalPages,
    doSearchMovies,
    search,
    changeSearch,
    showModal,
    changeModal,
    changeModalMovie,
    modalMovie,
  } = useContext(MovieContext);

  const {
    addToFavoriteMovies,
    favoriteMovies
  } = useContext(FavoriteContext)

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
    <div className="home pt-4">
      <MovieModal
        showModal={showModal}
        changeModal={changeModal}
        modalMovie={modalMovie}
        modalAction={addToFavoriteMovies}
        favoriteMovies={favoriteMovies}
      />
      <NavBar user={user} logout={logout} />
      <Container className="homeContent pt-5">
        <MoviesMenu
          changeType={changeType}
          typeMovies={typeMovies}
          searchMovies={doSearchMovies}
          search={search}
          changeSearch={changeSearch}
        />
        <Container className="moviesSection">
          <Row>
            {loadingMovies ? (
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
        {!loadingMovies && displayMoviesTotalPages > 0 && (
          <MoviePagination
            changePage={changePage}
            page={page}
            displayMoviesTotalPages={displayMoviesTotalPages}
          />
        )}
      </Container>
    </div>
  );
};

export default Home;
