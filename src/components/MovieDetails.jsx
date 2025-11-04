import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/api";

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load movie details
  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load movie details:", err);
        setError("Failed to load movie details. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) loadDetails();
  }, [movieId]);

  // Format currency (for revenue)
  const formatCurrency = (num) =>
    num
      ? `$${new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(num)}`
      : "N/A";

  return (
    <section className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-neutral-900 w-full max-w-5xl mx-4 rounded-2xl overflow-hidden relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-2 transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* CONDITIONAL RENDERING */}
        {loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-neutral-300">Loading Details...</p>
          </div>
        ) : error ? (
          // Error State
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <h2 className="text-xl font-bold text-red-500">{error}</h2>
            <button
              onClick={onClose}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              Close
            </button>
          </div>
        ) : movie ? (
          // Movie Details
          <div className="text-white">
            {/* Banner Section */}
            <div className="relative h-80 md:h-[420px]">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent"></div>

              <div className="absolute bottom-6 left-6 md:left-12 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {movie.title}{" "}
                  <span className="text-neutral-400 font-normal text-lg">
                    ({movie.release_date?.split("-")[0]})
                  </span>
                </h1>
                <p className="mt-2 text-neutral-400 italic">
                  {movie.tagline || "No tagline available"}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10">
              {/* Poster and Info */}
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>

                <div className="md:w-2/3">
                  {/* Overview */}
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-neutral-300 mb-6">
                    {movie.overview || "No overview available."}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-neutral-300">
                    <div>
                      <p className="text-neutral-400">Runtime</p>
                      <p>{movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-neutral-400">Rating</p>
                      <p>
                        ⭐ {movie.vote_average?.toFixed(1)} (
                        {movie.vote_count?.toLocaleString()} votes)
                      </p>
                      <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-1">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{
                            width: `${Math.round(movie.vote_average * 10)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-neutral-400">Genres</p>
                      <p>
                        {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-neutral-400">Release Date</p>
                      <p>{movie.release_date || "N/A"}</p>
                    </div>

                    <div>
                      <p className="text-neutral-400">Budget</p>
                      <p>{formatCurrency(movie.budget)}</p>
                    </div>

                    <div>
                      <p className="text-neutral-400">Revenue</p>
                      <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Companies */}
              {movie.production_companies?.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">
                    Production Companies
                  </h2>
                  <div className="flex flex-wrap gap-6">
                    {movie.production_companies.map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center space-x-3 bg-neutral-800 p-3 rounded-lg"
                      >
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-10 object-contain"
                          />
                        )}
                        <span>{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default MovieDetails;
