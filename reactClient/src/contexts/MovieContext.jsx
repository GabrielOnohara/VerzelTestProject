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
const MovieContext = createContext();

function MovieProvider({ children }) {
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [typeMovies, setTypeMovies] = useState("popular");
  const [page, setPage] = useState(1);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const { token } = useContext(UserContext);

  const changeType = useCallback((type) => {
    setTypeMovies(type);
    setLoadingMovies(true)
    setTimeout(() => {
        switch (type) {
        case "popular":
            setDisplayMovies(popularMovies);
            break;
        case "upcoming":
            setDisplayMovies(upcomingMovies);
            break;
        case "top_rated":
            setDisplayMovies(topRatedMovies);
            break;
        case "now_playing":
            setDisplayMovies(nowPlayingMovies);
            break;
        default:
            break;
        }
        setLoadingMovies(false)
    }, 1000)
  }, [popularMovies, upcomingMovies, topRatedMovies, nowPlayingMovies]);

  const fetchMovies = useCallback(
    async (page = 1, type) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/movies/${type}?page=${page}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const { results } = response.data;

        if (Array(results).length > 0) {
          switch (type) {
            case "popular":
              setPopularMovies(results);
              break;
            case "upcoming":
              setUpcomingMovies(results);
              break;
            case "top_rated":
              setTopRatedMovies(results);
              break;
            case "now_playing":
              setNowPlayingMovies(results);
              break;
            default:
              break;
          }
        }
      } catch (error) {
        switch (type) {
          case "popular":
            setPopularMovies([]);
            break;
          case "upcoming":
            setUpcomingMovies([]);
            break;
          case "top_rated":
            setTopRatedMovies([]);
            break;
          case "now_playing":
            setNowPlayingMovies([]);
            break;
          default:
            break;
        }
        console.error(error);
      }
    },
    [token]
  );

  const fetchAllMovies = useCallback(async () => {
    setLoadingMovies(true);
    try {
      await Promise.all([
        fetchMovies(1, "popular"),
        fetchMovies(1, "upcoming"),
        fetchMovies(1, "top_rated"),
        fetchMovies(1, "now_playing"),
      ]);
    } catch (error) {
      console.error("Erro ao buscar todos os filmes:", error);
    } finally {
      setLoadingMovies(false);
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  useEffect(() => {
    console.log(typeMovies);
    
    changeType(typeMovies)
  }, [typeMovies, changeType]);

  return (
    <MovieContext.Provider
      value={{
        displayMovies,
        popularMovies,
        upcomingMovies,
        topRatedMovies,
        nowPlayingMovies,
        loadingMovies,
        typeMovies,
        page,
        changeType,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieContext, MovieProvider };
