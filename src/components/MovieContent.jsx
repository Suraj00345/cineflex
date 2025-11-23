import React from "react";
import HeroSection from "./HeroSection";
import MovieSlider from "./MovieSlider";
import GenreSection from "./GenreSection";
import MovieDetails from "./MovieDetails";
import { useMovies } from "../context/MovieContext";

const MovieContent = () => {
  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    selectedMovieId,
    openMoviesDetails,
    closeMovieDetails,
    error,
  } = useMovies();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-server-crash-icon lucide-server-crash"
          >
            <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
            <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
            <path d="M6 6h.01" />
            <path d="M6 18h.01" />
            <path d="m13 6-4 6h6l-4 6" />
          </svg>
          <h2 className="text-2xl font-bold mt-4">Error Loading Movies</h2>
          <p className="mt-2 text-neutral-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <div className="bg-linear-to-b from-neutral-900 to-neutral-950">
        <MovieSlider
          title="Trending This Week"
          subtitle="Stay Updated with what everone's watching"
          movies={trendingMovies}
          id="trending"
        />

        <MovieSlider
          title="Popular Movies"
          subtitle="Most Watched movies right now"
          movies={popularMovies}
          id="popular"
        />

        <GenreSection />

        <MovieSlider
          title="Top Rated Movies"
          subtitle="Highest rated movies of all time"
          movies={topRatedMovies}
          id="top-rated"
        />
      </div>
      {/* conditional rendering */}
      {selectedMovieId && (
        <MovieDetails movieId={selectedMovieId} onClose={closeMovieDetails} />
      )}
    </>
  );
};

export default MovieContent;
