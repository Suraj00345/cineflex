import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendMovies,
} from "../services/api";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

export const MoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [trending, popular, topRated, genreList] = await Promise.all([
          fetchTrendMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchGenres(),
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setGenre(genreList);
      } catch (error) {
        console.log("error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  const openMoviesDetails = (moviesId) => {
    setSelectedMovieId(moviesId);
    document.body.style.overflow = "hidden";
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
    document.body.style.overflow = "";
  };

  return (
    <MovieContext
      value={{
        trendingMovies,
        popularMovies,
        topRatedMovies,
        genre,
        loading,
        error,
        selectedMovieId,
        openMoviesDetails,
        closeMovieDetails,
      }}
    >
      {children}
    </MovieContext>
  );
};
