import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { SharedContext } from "../../contexts/SharedContext";

import verzelLogo from "../../assets/logo2.jpg";
import NavBar from "./NavBar";
import MovieCard from "../home/MovieCard";
import MovieModal from "../shared/MovieModal";
import "../favorites/Favorites.css";


const Shared = () => {
  const { userId } = useParams();

  const {
    sharedLoading,
    showSharedModalMovies,
    changeSharedModal,
    sharedModalMovie,
    changeShareModalMovie,
    changeId,
    sharedMovies,
  } = useContext(SharedContext);

  useEffect(()=>{
    changeId(userId)
  },[changeId, userId])

  if (sharedLoading)
    return (
      <div className="homeTokenInvalid">
        <div>
          <img
            src={verzelLogo}
            className="logo2 my-4"
            alt="Verzel Movies logo"
          />
        </div>
        <h1>Carregando lista</h1>
        <p>Aguarde alguns segundos</p>
      </div>
    );

    if ((sharedMovies || []).length == 0)
      return (
        <div className="homeTokenInvalid">
          <div>
            <img
              src={verzelLogo}
              className="logo2 my-4"
              alt="Verzel Movies logo"
            />
          </div>
          <h1>Lista vazia</h1>
          <p>Erro ao buscar lista</p>
        </div>
      );


  return (
    <div className="favorites pt-4">
      <MovieModal
        showModal={showSharedModalMovies}
        changeModal={changeSharedModal}
        modalMovie={sharedModalMovie}
      />
      <NavBar />
      <Container className="homeContent pt-5">
        {/* <MoviesMenu
          search={search}
          changeSearch={changeSearch}
          searchMovies={searchMovies}
        /> */}
        <Container className="moviesSection">
          <Row>
            {sharedLoading ? (
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
              Array((sharedMovies || []).length > 0) &&
              (sharedMovies || []).map((movie, index) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  changeModalMovie={changeShareModalMovie}
                />
              ))
            )}
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Shared;
