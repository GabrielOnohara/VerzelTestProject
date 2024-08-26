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
import { MovieContext } from "./MovieContext";
const FavoriteContext = createContext();

function FavoriteProvider({ children }) {
  const [search, setSearch] = useState("");
  // const [page, setPage] = useState(1);

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [showFavoriteModal, setFavoriteShowModal] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);

  const { token, tokenWasValidated } = useContext(UserContext);
  const { changeModal } = useContext(MovieContext);

  const changeFavoriteModal = (newValue) => {
    setFavoriteShowModal(newValue);
  };

  const changeModalMovie = (movie) => {
    if (movie) {
      setModalMovie(movie);
      changeFavoriteModal(true);
    } else {
      setModalMovie(null);
      changeFavoriteModal(false);
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

  const changeFavoritesMovies = (favorites) => {
    setFavoriteMovies(favorites)
    setDisplayMovies(favorites)
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
        movieData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const { favorites } = response.data;
      if (favorites) {
        toast.success('Filme adicionado na lista de favoritos')
        changeModal(false)
        changeFavoritesMovies(favorites)
      } else {
        changeModal(false)
        toast.error('Erro ao salvar filme na lista de favoritos')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFavoritesLoading(false);
    }
  }, [token, tokenWasValidated, changeModal])

  const removeFromFavoriteMovies = useCallback(async (movieData) => {
    setFavoritesLoading(true);
    if (!tokenWasValidated) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:5000/movies/favorites/${movieData._id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const { success } = response.data;
      if (success) {
        toast.success('Filme removido na lista de favoritos')
        changeFavoriteModal(false)
        fetchFavoriteMovies()
      } else {
        changeFavoriteModal(false)
        toast.error('Erro ao remover filme na lista de favoritos')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFavoritesLoading(false);
    }
  }, [token, tokenWasValidated, fetchFavoriteMovies])

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
        showFavoriteModal,
        changeFavoriteModal,
        modalMovie,
        changeModalMovie,
        favoriteMovies,
        favoritesLoading,
        displayMovies,
        setDisplayMovies,
        addToFavoriteMovies,
        removeFromFavoriteMovies
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
