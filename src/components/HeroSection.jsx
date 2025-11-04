import React, { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { getImageURL } from "../services/api";

const HeroSection = () => {
  const { trendingMovies, loading } = useMovies();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const featureMovies = trendingMovies.slice(0, 5);

  useEffect(() => {
    if (loading || featureMovies.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % featureMovies.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [loading, featureMovies.length]);

  if (loading || featureMovies.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-neutral-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-400">Loading Movies</p>
        </div>
      </div>
    );
  }

  const currentMovie = featureMovies[currentSlide];
  
  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  return (
    <div className="relative w-full h-screen">
      {/* movies backdrop */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isTransitioning ? "opacity-20" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${getImageURL(currentMovie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-neutral-900/70 to-neutral-900/20" />
        <div className="absolute inset-0 bg-linear-to-r from-neutral-900 to-transparent" />
      </div>
      {/* content */}
      <div className="absolute inset-0 flex items-center z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          {/* movies Info */}
          <div
            className={`transition-all duration-700 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-purple-500/90 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                FEATURED
              </span>
              {/* conditional rendering */}
              {currentMovie.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 22 24"
                    fill="yellow"
                    className="lucide lucide-star-icon lucide-star "
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <span className="text-white">
                    {formatRating(currentMovie.vote_average)}
                  </span>
                </div>
              )}
              {/* conditional Rendering Close */}
              <span className="text-neutral-400">.</span>
              <span className="text-neutral-300 text-sm">
                {currentMovie.release_date?.substring(0, 4) || "N/A"}
              </span>
              {/* Conditional Rendering */}
              {currentMovie.adult && (
                <div>
                  <span className="text-neutral-400">.</span>
                  <span className="bg-neutral-700 text-neutral-300 text-xs px-1.5 py-0.5 rounded-sm">
                    18+
                  </span>
                </div>
              )}
              {/* conditional Rendering Close */}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentMovie.title}
            </h1>
            <p className="text-neutral-300 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl">
              {currentMovie.overview}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play-icon lucide-play"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
                Watch Now
              </button>

              <button
                className="bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-6 py-3 rounded-lg flex items-center 
              gap-2 transition-all border border-neutral-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add to Watch List
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {featureMovies.map((_, index) => {
          return (
            <button
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-purple-500"
                  : "w-4 bg-neutral-600/50"
              }`}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
