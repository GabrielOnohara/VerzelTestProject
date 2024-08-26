import {
    createContext,
    useState,
    useEffect,
    useCallback,
  } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SharedContext = createContext();

function SharedProvider({ children }) {
    const [sharedLoading, setSharedLoading] = useState(true)
    const [sharedMovies, setSharedMovies] = useState([])
    const [showSharedModalMovies, setShowSharedModalMovies] = useState(false)
    const [sharedModalMovie, setSharedModalMovie] = useState(null)
    const [id, setId] = useState('')

    const changeSharedModal = (newValue) => {
        setShowSharedModalMovies(newValue);
    };
    
    const changeId = (value) => {
        if (value !== id) {
          setId(value);
          fetchSharedMovies();
        }
      };

    const changeShareModalMovie = (movie) => {
        if (movie) {
            setSharedModalMovie(movie);
            changeSharedModal(true);
        } else {
            setSharedModalMovie(null);
            changeSharedModal(false);
        }
    }

    const fetchSharedMovies = useCallback(async () => {
        setSharedLoading(true);
        if (!id) {
            return;
        }
        try {
            const response = await axios.get(
            import.meta.env.VITE_APP_API_URL + `/movies/favorites/${id}`,
            );
            const { favorites } = response.data;
            if (Array(favorites).length > 0) {
            setSharedMovies(favorites);
            }
        } catch (error) {
            setSharedMovies([]);
            console.error(error);
        } finally {
            setSharedLoading(false);
        }
    }, [id]);

      useEffect(() => {
        if(id) {
            fetchSharedMovies();
        }
      }, [id, fetchSharedMovies]);

    return (
    <SharedContext.Provider
        value={{
            sharedLoading,
            showSharedModalMovies,
            changeSharedModal,
            sharedModalMovie,
            changeShareModalMovie,
            changeId,
            sharedMovies,
        }}
    >
        {children}
    </SharedContext.Provider>
    );
}
    
SharedProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
    
export { SharedContext, SharedProvider };