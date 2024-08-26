import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { UserContext } from "./UserContext";
import { toast } from "react-toastify";
const FavoriteContext = createContext();

function FavoriteProvider({ children }) {
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);

  const { token, tokenWasValidated } = useContext(UserContext);

  const changeModal = (newValue) => {
    setShowModal(newValue);
  };

  const changeModalMovie = (movie) => {
    if (movie) {
      setModalMovie(movie);
      changeModal(true);
    } else {
      setModalMovie(null);
      changeModal(false);
    }
  };

  const changeSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const searchMovies = () => {
    setDisplayMovies(
      favoriteMovies
      .filter(
        item => item.title?.toLowerCase().includes(search.toLowerCase()) 
        || item.overview?.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  const fetchFavoriteMovies = useCallback(async () => {
    setFavoritesLoading(true);
    if (!tokenWasValidated) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:5000/movies/favorites",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const { favorites } = response.data;
      if (Array(favorites).length > 0) {
        setFavoriteMovies(favorites);
        setDisplayMovies(favorites)
      }
    } catch (error) {
      setFavoriteMovies([]);
      console.error(error);
    } finally {
      setFavoritesLoading(false);
    }
  }, [token, tokenWasValidated]);

  const addToFavoriteMovies = useCallback(async (movieData) => {
    setFavoritesLoading(true);
    if (!tokenWasValidated) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/movies/favorites",
        { 
          movieData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const { success } = response.data;
      if (success) {
        toast.success('Filme adicionado na lista de favoritos')
        fetchFavoriteMovies()
      } else {
        toast.error('Erro ao salvar filme na lista de favoritos')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFavoritesLoading(false);
    }
  }, [token, tokenWasValidated,fetchFavoriteMovies])

  // const changePage = useCallback(
  //   (newPage) => {
  //     if (newPage != page) {
  //       if (newPage <= 0) {
  //         if (typeMovies == "search") {
  //           doSearchMovies(newPage);
  //         } else {
  //           fetchMovies(newPage, typeMovies);
  //         }
  //         setPage(displayMoviesTotalPages);
  //       } else {
  //         if (newPage <= displayMoviesTotalPages) {
  //           if (typeMovies == "search") {
  //             doSearchMovies(newPage);
  //           } else {
  //             fetchMovies(newPage, typeMovies);
  //           }
  //           setPage(newPage);
  //         }
  //       }
  //     }
  //   },
  //   []
  // );

  useEffect(() => {
    fetchFavoriteMovies();
  }, [fetchFavoriteMovies]);

  return (
    <FavoriteContext.Provider
      value={{
        //   page,
        //   changePage,
        search,
        changeSearch,
        searchMovies,
        showModal,
        changeModal,
        modalMovie,
        changeModalMovie,
        favoriteMovies,
        favoritesLoading,
        displayMovies,
        setDisplayMovies,
        addToFavoriteMovies
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FavoriteContext, FavoriteProvider };
