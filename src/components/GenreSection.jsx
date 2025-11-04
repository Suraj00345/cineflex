import React, { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { fetchMoviesByGenre } from "../services/api";

const GenreSection = () => {
  const { genre, loading, openMoviesDetails } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenreMovies, setLoadingGenreMovies] = useState(false);

  useEffect(() => {
    if (!loading && genre.length > 0) {
      setSelectedGenre(genre[0]);
    }
  }, [loading, genre]);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (!selectedGenre) return;
      setLoadingGenreMovies(true);
      const movies = await fetchMoviesByGenre(selectedGenre.id);
      setGenreMovies(movies.slice(0, 8));
      setLoadingGenreMovies(false);
    };
    loadGenreMovies();
  }, [selectedGenre]);

  const formatRating = (rating) => (Math.round(rating * 10) / 10).toFixed(1);

  if (loading || !selectedGenre) {
    return (
      <section className="py-12 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-3xl font-bold mb-6">Browse by Genre</h2>

        {/* Genre Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {genre.slice(0, 10).map((gen) => (
              <button
                key={gen.id}
                onClick={() => setSelectedGenre(gen)}
                className={`px-4 py-2 rounded-md transition-colors text-sm ${
                  selectedGenre?.id === gen.id
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {gen.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Grid */}
        {loadingGenreMovies ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {genreMovies.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer"
                onClick={() => openMoviesDetails(movie.id)}
              >
                <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm font-medium">
                        ⭐ {formatRating(movie.vote_average)}
                      </span>
                      <span className="text-neutral-400 text-sm">
                        {movie.release_date?.slice(0, 4)}
                      </span>
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md mt-2 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
                <h3 className="mt-3 text-white text-sm font-medium truncate">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenreSection;
