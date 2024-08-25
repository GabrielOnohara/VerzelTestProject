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
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [displayMoviesTotalPages, setDisplayMoviesTotalPages] = useState(0);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchMoviesTotalPages, setSearchMoviesTotalPages] = useState(0);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularMoviesTotalPages, setPopularMoviesTotalPages] = useState(0);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingMoviesTotalPages, setUpcomingMoviesTotalPages] = useState(0);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedMoviesTotalPages, setTopRatedMoviesTotalPages] = useState(0);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [nowPlayingMoviesTotalPages, setNowPlayingMoviesTotalPages] =
    useState(0);

  const { token, tokenWasValidated } = useContext(UserContext);

  const changeSearch = (newSearch) => {
    setSearch(newSearch)
  }
  
  const changeType = useCallback(
    (type) => {
      setTypeMovies(type);
      setLoadingMovies(true);
      setTimeout(() => {
        switch (type) {
          case "popular":
            setDisplayMovies(popularMovies);
            setDisplayMoviesTotalPages(popularMoviesTotalPages);
            break;
          case "upcoming":
            setDisplayMovies(upcomingMovies);
            setDisplayMoviesTotalPages(upcomingMoviesTotalPages);
            break;
          case "top_rated":
            setDisplayMovies(topRatedMovies);
            setDisplayMoviesTotalPages(topRatedMoviesTotalPages);
            break;
          case "now_playing":
            setDisplayMovies(nowPlayingMovies);
            setDisplayMoviesTotalPages(nowPlayingMoviesTotalPages);
            break;
          case "search":
            setDisplayMovies(searchMovies);
            setDisplayMoviesTotalPages(searchMoviesTotalPages)
            break;
          default:
            break;
        }
        setLoadingMovies(false);
      }, 1000);
    },
    [
      popularMovies,
      upcomingMovies,
      topRatedMovies,
      nowPlayingMovies,
      popularMoviesTotalPages,
      upcomingMoviesTotalPages,
      topRatedMoviesTotalPages,
      nowPlayingMoviesTotalPages,
      searchMovies,
      searchMoviesTotalPages
    ]
  );

  const doSearchMovies = useCallback(
    async (page = 1) => {
        setLoadingMovies(true);
        if (!tokenWasValidated) {
            return;
        }
        try {
            const response = await axios.get(
              `http://localhost:5000/movies/search?query=${search}&page=${page > 0 ? page : 1}`,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
    
            const { results, total_pages } = response.data;
            if (Array(results).length > 0) {
                setSearchMovies(results);
                setSearchMoviesTotalPages(total_pages - 1);
            }
        } catch(error){
            setSearchMovies([])
            console.error(error);
        } finally {
            setLoadingMovies(false);
            changeType('search')
        }   
    },[tokenWasValidated, token, changeType, search])

  const fetchMovies = useCallback(
    async (page = 1, type) => {
      if (!tokenWasValidated) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/movies/${type}?page=${page}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const { results, total_pages } = response.data;

        if (Array(results).length > 0) {
          switch (type) {
            case "popular":
              setPopularMovies(results);
              setPopularMoviesTotalPages(total_pages - 1);
              break;
            case "upcoming":
              setUpcomingMovies(results);
              setUpcomingMoviesTotalPages(total_pages - 1);
              break;
            case "top_rated":
              setTopRatedMovies(results);
              setTopRatedMoviesTotalPages(total_pages - 1);
              break;
            case "now_playing":
              setNowPlayingMovies(results);
              setNowPlayingMoviesTotalPages(total_pages - 1);
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
    [token, tokenWasValidated]
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

  const changePage = useCallback(
    (newPage) => {
      if (newPage != page) {
        if (newPage <= 0) {
          if(typeMovies == 'search'){
            doSearchMovies(newPage)
          } else {
            fetchMovies(newPage, typeMovies);
          }
          setPage(displayMoviesTotalPages);
        } else {
          if (newPage <= displayMoviesTotalPages) {
            if(typeMovies == 'search'){
              doSearchMovies(newPage)
            } else {
              fetchMovies(newPage, typeMovies);
            }
            setPage(newPage);
          }
        }
      }
    },
    [displayMoviesTotalPages, page, typeMovies, fetchMovies, doSearchMovies]
  );

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  useEffect(() => {
    changeType(typeMovies);
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
        changePage,
        displayMoviesTotalPages,
        doSearchMovies,
        search,
        changeSearch
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
