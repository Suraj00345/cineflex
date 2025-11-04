const API_KEY = "d0b961118ec32390ce21c96f2874a8be";
const BASE_URL = "https://api.themoviedb.org/3"; // ✅ Corrected base URL

// Fetch trending movies (weekly)
export const fetchTrendMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results; // ✅ Corrected from data.result → data.results
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return [];
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results; // ✅ Corrected
  } catch (error) {
    console.log("Error fetching popular movies:", error);
    return [];
  }
};

// Fetch top rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results; // ✅ Corrected
  } catch (error) {
    console.log("Error fetching top-rated movies:", error);
    return [];
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1` // ✅ Added missing '&' before page
    );
    const data = await response.json();
    return data.results; // ✅ Corrected
  } catch (error) {
    console.log("Error fetching movies by genre:", error);
    return [];
  }
};

// Fetch all genres
export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log("Error fetching genres:", error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null;
  }
};

// Search movies by title
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false` // ✅ Corrected endpoint & encoded query
    );
    const data = await response.json();
    return data.results; // ✅ Corrected
  } catch (error) {
    console.log("Error searching movies:", error);
    return [];
  }
};

// Get image URL
export const getImageURL = (path, size = "original") => {
  if (!path)
    return "https://via.placeholder.com/400x600?text=No+Image+Available";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
